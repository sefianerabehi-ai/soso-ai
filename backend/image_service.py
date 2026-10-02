import os
import re
import uuid
import json
import urllib.parse
from pathlib import Path
from typing import Optional, Dict, Any

import httpx
from PIL import Image

from .config import BASE_DIR, load_settings
from .storage import UPLOADS_DIR

STYLE_MODIFIERS = {
    "photorealistic": "hyperrealistic photography, 8k resolution, cinematic lighting, shot on 35mm lens, photorealistic masterpiece, sharp focus",
    "cinematic": "cinematic movie still, dramatic lighting, 35mm film, atmospheric depth, volumetric light, color graded",
    "anime": "modern anime art style, vibrant colors, detailed illustration, studio anime aesthetic, beautiful lighting",
    "digital-art": "digital concept art, trending on ArtStation, vivid colors, highly detailed illustration, artistic masterpiece",
    "3d-render": "3D render, Unreal Engine 5, Octane render, ray tracing, smooth textures, subsurface scattering",
    "oil-painting": "classical oil painting, visible canvas texture, rich oil brushstrokes, fine art masterpiece",
    "fantasy": "epic high fantasy artwork, glowing magical atmosphere, ethereal lighting, mythical majestic aesthetic",
    "cyberpunk": "cyberpunk neon aesthetic, glowing holographic signs, rainy futuristic street, neon reflections, blade runner vibe",
    "watercolor": "delicate watercolor painting, soft paper texture, artistic color bleeds, fine brushwork"
}

ASPECT_RATIOS = {
    "1:1": (1024, 1024),
    "16:9": (1024, 576),
    "9:16": (576, 1024),
    "4:3": (1024, 768),
    "3:4": (768, 1024)
}

class ImageService:
    def __init__(self):
        self.uploads_dir = UPLOADS_DIR
        self.uploads_dir.mkdir(parents=True, exist_ok=True)

    async def _enhance_prompt_with_gemini(self, prompt: str, style_desc: str = "") -> str:
        """
        Uses Gemini to translate non-English prompts (e.g. Arabic)
        and expand them into vivid, high-fidelity diffusion prompts.
        """
        try:
            settings = load_settings()
            api_key = settings.get("api_key", "").strip()
            if not api_key:
                return prompt

            from google import genai
            from google.genai import types

            client = genai.Client(api_key=api_key)
            system_instruction = (
                "You are an expert AI prompt engineer for high-resolution image generators (Flux/Midjourney). "
                "Translate and expand the user's description into a vivid, descriptive English diffusion prompt. "
                "Include details about subject, lighting, composition, mood, and textures. "
                "Do NOT include conversational filler, quotes, or markdown. Output ONLY the raw descriptive prompt."
            )

            user_query = f"User request: {prompt}."
            if style_desc:
                user_query += f" Desired visual style: {style_desc}."

            def call_gemini():
                return client.models.generate_content(
                    model="gemini-3.5-flash-lite",
                    contents=[types.Content(role="user", parts=[types.Part.from_text(text=user_query)])],
                    config=types.GenerateContentConfig(
                        system_instruction=system_instruction,
                        temperature=0.7,
                        max_output_tokens=300
                    )
                )

            import asyncio
            response = await asyncio.to_thread(call_gemini)
            if response and response.text and len(response.text.strip()) > 10:
                enhanced = response.text.strip().replace("\n", " ").strip("\"'")
                return enhanced
        except Exception as e:
            print(f"Prompt enhancement notice: {e}")

        return prompt

    async def generate_image(
        self,
        prompt: str,
        style: str = "photorealistic",
        aspect_ratio: str = "1:1",
        model: str = "flux",
        seed: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Generates a high-definition, watermark-free image using Pollinations Flux/SDXL with multi-model fallback.
        """
        prompt = prompt.strip()
        if not prompt:
            raise ValueError("Prompt cannot be empty")

        style_modifier = STYLE_MODIFIERS.get(style, STYLE_MODIFIERS["photorealistic"])
        width, height = ASPECT_RATIOS.get(aspect_ratio, (1024, 1024))

        # Check if prompt contains Arabic or needs translation/enhancement
        has_arabic = bool(re.search(r'[\u0600-\u06FF]', prompt))
        enhanced_prompt = prompt
        if has_arabic or len(prompt.split()) < 8:
            enhanced_prompt = await self._enhance_prompt_with_gemini(prompt, style_modifier)

        full_prompt = f"{enhanced_prompt}, {style_modifier}"
        encoded_prompt = urllib.parse.quote(full_prompt)

        actual_seed = seed if seed is not None else int(uuid.uuid4().int % 10000000)

        # Candidate models and dimension fallbacks (ensuring all dimensions are multiples of 64)
        candidates = [
            (model, width, height),
            ("turbo", width, height),
            (None, width, height),
            ("turbo", 1024, 1024),
            (None, 1024, 1024)
        ]

        image_bytes = None
        last_status = 500

        async with httpx.AsyncClient(timeout=40.0) as client:
            for cand_model, w, h in candidates:
                try:
                    url = (
                        f"https://image.pollinations.ai/prompt/{encoded_prompt}"
                        f"?width={w}&height={h}&nologo=true&seed={actual_seed}"
                    )
                    if cand_model:
                        url += f"&model={cand_model}"

                    resp = await client.get(url)
                    last_status = resp.status_code
                    if resp.status_code == 200 and len(resp.content) > 1000:
                        image_bytes = resp.content
                        width, height = w, h
                        break
                    else:
                        print(f"Candidate model={cand_model} {w}x{h} returned {resp.status_code}")
                except Exception as cand_err:
                    print(f"Candidate model={cand_model} failed: {cand_err}")

        if not image_bytes:
            raise RuntimeError(f"تعذر توليد الصورة مؤقتاً بسبب ضغط الخوادم (رمز: {last_status}). يرجى المحاولة مجدداً.")

        # Save image locally
        filename = f"generated_{uuid.uuid4().hex[:12]}.png"
        file_path = self.uploads_dir / filename
        with open(file_path, "wb") as f:
            f.write(image_bytes)

        return {
            "success": True,
            "filename": filename,
            "image_url": f"/api/uploads/{filename}",
            "original_prompt": prompt,
            "enhanced_prompt": enhanced_prompt,
            "style": style,
            "aspect_ratio": aspect_ratio,
            "width": width,
            "height": height,
            "seed": actual_seed
        }

    async def edit_image_with_ai(
        self,
        image_bytes: bytes,
        edit_instruction: str,
        style: str = "photorealistic",
        aspect_ratio: str = "1:1"
    ) -> Dict[str, Any]:
        """
        Modifies an existing image with AI based on instructions.
        Uses Gemini Vision to understand the base image + edits,
        then synthesizes the modified image in high quality without watermark.
        """
        edit_instruction = edit_instruction.strip()
        if not edit_instruction:
            raise ValueError("Edit instruction cannot be empty")

        settings = load_settings()
        api_key = settings.get("api_key", "").strip()

        style_modifier = STYLE_MODIFIERS.get(style, STYLE_MODIFIERS["photorealistic"])
        width, height = ASPECT_RATIOS.get(aspect_ratio, (1024, 1024))

        new_prompt = edit_instruction
        if api_key:
            try:
                from google import genai
                from google.genai import types

                client = genai.Client(api_key=api_key)
                prompt_vision = (
                    f"Analyze this image carefully. The user wants to modify it with this instruction: '{edit_instruction}'. "
                    f"Create an ultra-detailed, high-quality visual prompt for an image generator that preserves the main subject "
                    f"and core elements of the original image, while applying the requested changes: '{edit_instruction}'. "
                    f"Output ONLY the descriptive visual prompt in English, with zero conversational text."
                )

                def call_vision():
                    return client.models.generate_content(
                        model="gemini-3.5-flash-lite",
                        contents=[
                            types.Content(
                                role="user",
                                parts=[
                                    types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
                                    types.Part.from_text(text=prompt_vision)
                                ]
                            )
                        ]
                    )

                import asyncio
                res = await asyncio.to_thread(call_vision)
                if res and res.text:
                    new_prompt = res.text.strip().replace("\n", " ").strip("\"'")
            except Exception as vision_err:
                print(f"Vision analysis notice: {vision_err}")

        # Now generate the modified image
        return await self.generate_image(
            prompt=new_prompt,
            style=style,
            aspect_ratio=aspect_ratio
        )

image_service = ImageService()
