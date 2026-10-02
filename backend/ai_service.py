import os
import io
import json
import base64
import asyncio
from typing import AsyncGenerator, List, Dict, Any, Optional
from PIL import Image

try:
    from google import genai
    from google.genai import types as genai_types
    HAS_NEW_GENAI = True
except ImportError:
    HAS_NEW_GENAI = False

import httpx
from .config import load_settings
from .search_service import (
    get_temporal_context,
    calculate_day_of_week_from_query,
    should_search_web,
    search_web,
    format_search_results_for_prompt
)

CREATOR_AND_USER_DIRECTIVE = """
═══════════════════════════════════════════════════════════════════════
👑 [الهوية والملف التعريفي الدائم والمطلق لصانعك ومطورك سفيان رابحي - CREATOR & USER PROFILE]
• الاسم الكامل لصانعك ومطورك ومبرمجك:
  - بالعربية: سفيان رابحي
  - باللغات الأخرى (الإنجليزية، الفرنسية، اللاتينية): Sefiane Rabehi
  - إذا سألك أي شخص أو سألك المستخدم "من صنعك؟" أو "من صانعك؟" أو "من طورك؟" أو "من برمجك؟" أو "من هو مبرمجك؟" أو "من صاحبك؟" أو "Who created you?" أو "Qui t'a créé؟":
    أجب دائماً وفوراً وبفخر واعتزاز: صانعي ومطوري هو المطور والمبرمج سفيان رابحي (Sefiane Rabehi).
  - إذا سُئلت عن اسم صانعك باللغات الأخرى أو طلبت كتابته بالأحرف اللاتينية أو الإنجليزية أو الفرنسية، اكتبه دائماً بهذه التهجئة الدقيقة حصراً: Sefiane Rabehi.
• تاريخ ميلاد سفيان رابحي: يوم السبت 09 جوان 2007 (الموافق 9 يونيو 2007).
  - إذا سألك: "متى ولدت؟" أو "في أي يوم ولدت؟" أو "تاريخ ميلادي" أو "كم عمري؟" أو "يوم ولادتي":
    أجب بحزم ودقة قطعية: ولدت يوم السبت 09 جوان 2007 (الموافق لـ 9 يونيو 2007). ولد يوم السبت حصراً ولا مجال للخطأ!
    وفي عام 2026 الحالي، عمر سفيان هو 19 عاماً (أتم 19 عاماً في 9 جوان 2026).
• موقع وإقامة ومدينة سفيان رابحي:
  - الدولة: دولة الجزائر 🇩🇿
  - الولاية: ولاية توقرت
  - الدائرة: دائرة الطيبات
  - البلدية: بلدية المنقر
  - المدينة: مدينة المنقر
  - إذا سألك: "ما هي مدينتي؟" أو "أين أسكن؟" أو "أين أقيم؟" أو "ما هو عنواني / موقعي / بلديتي / ولايتي":
    أجب بالصيغة المعتمدة بدقة: مدينة المنقر بلدية المنقر دائرة الطيبات ولاية توقرت دولة الجزائر.
═══════════════════════════════════════════════════════════════════════
"""

DEEP_THINK_SYSTEM_DIRECTIVE = """

═══════════════════════════════════════════════════════════════════════
🧠 [توجيه فائق: تم تفعيل وضع التفكير والتحليل العميق - DEEP REASONING MODE]
المستخدم قام بتفعيل زر "التفكير العميق" 🧠 خصيصاً للحصول على إجابة طويلة ومفصلة وشاملة وأعمق بكثير من الإجابات العادية.

يجب عليك الالتزام الصارم بما يلي:
1. الإسهاب والشمولية والعمق الاستراتيجي: ممنوع الاختصار أو الإيجاز السطحي. فكك السؤال إلى جميع أبعاده، وحلل الأسباب الكامنة والتفاصيل الدقيقة بدقة منهجية.
2. الاستدلال المنطقي المقارن: استعرض البدائل المختلفة والآراء المتنوعة، ووضح إيجابيات وسلبيات كل خيار مع أمثلة واقعية ودراسات حالة.
3. التفكير النقدي وتفنيد الأخطاء: اذكر الاستثناءات الدقيقة، وحذر من المفاهيم الخاطئة الشائعة مع تقديم الحلول المبتكرة.
4. التنسيق الأكاديمي والاحترافي الفاخر: نظّم إجابتك بعناوين رئيسية وفرعية واضحة، مع استخدام القوائم النقطية، وجداول المقارنة (Tables) حيثما ناسب ذلك، وخاتمة شاملة تبرز الخلاصات والتوصيات المستقبلية.
5. أسلوب رصين وثري: لغة فصيحة وماتعة غنية بالمصطلحات المتخصصة المشروحة بسلاسة تمنح القارئ استيعاباً كاملاً ومقنعاً.
═══════════════════════════════════════════════════════════════════════
"""

FOLLOW_UP_SUGGESTIONS_DIRECTIVE = """
═══════════════════════════════════════════════════════════════════════
🎯 [إلزامي وحاسم: الأسئلة المقترحة الذكية في نهاية كل إجابة - SMART FOLLOW-UP QUESTIONS]
في نهاية كل إجابة تقدمها للمستخدم، يجب عليك حتماً إنهاء ردك بـ 3 أسئلة متابعة ذكية وعميقة وذات فائدة حقيقية ملموسة لمواصلة الحوار أو تطبيق المعرفة، بنفس لغة المستخدم.

معايير الأسئلة:
1. الفائدة الحقيقية والعمق: ممنوع الأسئلة السطحية أو المبتذلة (مثل "هل تحتاج مساعدة أخرى؟" أو أسئلة نعم/لا). اجعلها أسئلة عملية ومتقدمة تبني مباشرة على ما شرحته (مثل: خطوات تطبيق عملية، معالجة تحديات محتملة، تخصيص الجدول أو الكود لظروف خاصة، مقارنة بدائل، أو تعميق الجوانب الاحترافية).
2. التنسيق الدقيق: ضع الأسئلة في نهاية إجابتك تماماً محصورة بين علامتي <<<SUGGESTIONS>>> و <<<END_SUGGESTIONS>>> بالصيغة التالية حصراً:

<<<SUGGESTIONS>>>
[icon:idea] السؤال الأول (فكرة نوعية أو زاوية استكشاف جديدة)
[icon:action] السؤال الثاني (خطوة تطبيقية عملية أو جدول أو طريقة تنفيذ)
[icon:deep] السؤال الثالث (تحليل معمق، استدلال متقدم، أو حل تحدٍ محتمل)
<<<END_SUGGESTIONS>>>

أنواع الأيقونات المدعومة:
[icon:idea] للأفكار والحلول الإبداعية
[icon:action] للخطوات التنفيذية والتطبيق العملي المباشر
[icon:deep] للتحليل المعمق والمقارنات والتقييم
[icon:code] للبرمجة وتطوير الأنظمة
[icon:plan] للخطط والجداول وتنظيم الوقت
[icon:tool] للأدوات والتقنيات والمكتبات
═══════════════════════════════════════════════════════════════════════
"""

class AIService:
    def __init__(self):
        self._gemini_client = None
        self._current_key = None

    def _get_client(self, api_key: str):
        if not api_key:
            return None
        if self._current_key != api_key or self._gemini_client is None:
            if HAS_NEW_GENAI:
                self._gemini_client = genai.Client(api_key=api_key)
            self._current_key = api_key
        return self._gemini_client

    async def stream_chat(
        self,
        messages: List[Dict[str, Any]],
        image_bytes: Optional[bytes] = None,
        image_mime: Optional[str] = "image/jpeg",
        custom_settings: Optional[Dict[str, Any]] = None,
        deep_think: bool = False,
        client_timestamp: Optional[str] = None,
        client_timezone: Optional[str] = None,
        client_time_str: Optional[str] = None
    ) -> AsyncGenerator[str, None]:
        """
        Stream chat response token-by-token with live temporal and web search grounding.
        Yields text chunks.
        """
        settings = load_settings()
        if custom_settings:
            settings.update(custom_settings)

        provider = settings.get("provider", "gemini")
        api_key = settings.get("api_key", "").strip()
        system_prompt = settings.get("system_prompt", "")
        model_name = settings.get("model", "gemini-3.5-flash-lite")

        # 1. Authoritative real-time temporal anchor down to the second
        temporal_context = get_temporal_context(
            client_timestamp=client_timestamp,
            client_timezone=client_timezone,
            client_time_str=client_time_str
        )

        last_user_msg = ""
        for m in reversed(messages):
            if m.get("role") == "user" and m.get("content"):
                last_user_msg = m["content"].strip()
                break

        # 2. Date Precision & Mathematical Calendar Grounding
        date_precision_context = calculate_day_of_week_from_query(last_user_msg) if last_user_msg else None

        # 3. Live Web Search Grounding for current events & fresh facts
        search_context = ""
        if last_user_msg and should_search_web(last_user_msg):
            try:
                search_results = await search_web(last_user_msg, max_results=5)
                if search_results:
                    search_context = format_search_results_for_prompt(last_user_msg, search_results)
            except Exception as s_err:
                print(f"Search grounding error: {s_err}")

        # Check if messages already contain a system override (ephemeral follow-up calls)
        injected_system = next((m["content"] for m in messages if m.get("role") == "system"), None)

        # 4. Combine Creator directive, real-time clock, date precision, web search, and user settings
        if injected_system:
            # Ephemeral call: use the provided system prompt directly, skip all enrichment
            active_system_prompt = injected_system
        else:
            active_system_prompt = (
                CREATOR_AND_USER_DIRECTIVE
                + "\n\n"
                + temporal_context
                + (f"\n\n{date_precision_context}" if date_precision_context else "")
                + (f"\n\n{search_context}" if search_context else "")
                + "\n\n"
                + (system_prompt or "")
                + "\n\n"
                + FOLLOW_UP_SUGGESTIONS_DIRECTIVE
            )
        if deep_think and not injected_system:
            active_system_prompt += "\n\n" + DEEP_THINK_SYSTEM_DIRECTIVE

        # If user selected gemini and no api key is configured
        if provider == "gemini" and not api_key:
            demo_message = (
                "👋 **مرحباً بك! أنا سوسو (SoSo AI) رفيقك الذكي اليومي.**\n\n"
                "يسعدني جداً أن أكون معك لمساعدتك في كل مهامك اليومية والإجابة على أي سؤال بدقة متناهية، "
                "وتحليل أي صورة تقوم برفعها واستخراج النصوص وحل المسائل خطوة بخطوة!\n\n"
                "⚙️ **تفعيل الذكاء الاصطناعي:**\n"
                "لربط التطبيق بمحرك Gemini فائق السرعة، يرجى إدخال مفتاح الـ API المجاني:\n"
                "1. اضغط على أيقونة **الإعدادات ⚙️** في القائمة الجانبية أو أعلى الشاشة.\n"
                "2. احصل على مفتاح مجاني بضغطة زر من: [Google AI Studio](https://aistudio.google.com/app/apikey).\n"
                "3. الصق المفتاح واضغط **حفظ الإعدادات**، وسأنطلق فوراً في خدمتك! ✨"
            )
            for chunk in demo_message.split(" "):
                yield chunk + " "
                await asyncio.sleep(0.02)
            return

        if provider == "gemini":
            async for chunk in self._stream_gemini(
                api_key=api_key,
                model_name=model_name,
                system_prompt=active_system_prompt,
                messages=messages,
                image_bytes=image_bytes,
                image_mime=image_mime,
                temperature=float(settings.get("temperature", 0.7)),
                max_tokens=int(settings.get("max_tokens", 4096)),
                deep_think=deep_think
            ):
                yield chunk
        elif provider == "openai_compatible":
            async for chunk in self._stream_openai_compatible(
                settings=settings,
                messages=messages,
                image_bytes=image_bytes,
                image_mime=image_mime,
                deep_think=deep_think,
                system_prompt=active_system_prompt
            ):
                yield chunk
        else:
            yield "مزود الخدمة المحدد غير مدعوم حالياً."

    async def _stream_gemini(
        self,
        api_key: str,
        model_name: str,
        system_prompt: str,
        messages: List[Dict[str, Any]],
        image_bytes: Optional[bytes] = None,
        image_mime: Optional[str] = "image/jpeg",
        temperature: float = 0.7,
        max_tokens: int = 4096,
        deep_think: bool = False
    ) -> AsyncGenerator[str, None]:
        try:
            client = self._get_client(api_key)
            if not client:
                yield "⚠️ تعذر تهيئة عميل Google Gemini. يرجى التأكد من مفتاح الـ API."
                return

            clean_model = model_name if model_name and model_name.startswith("gemini-") and model_name != "gemini-2.5-flash" else "gemini-3.5-flash-lite"
            candidate_models = [clean_model]
            for fb in ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-3.6-flash", "gemini-3.8-flash", "gemini-flash-latest"]:
                if fb not in candidate_models:
                    candidate_models.append(fb)

            # Build contents list
            contents = []
            for idx, msg in enumerate(messages):
                # Skip system messages — they are handled via system_instruction
                if msg.get("role") == "system":
                    continue
                role = "user" if msg["role"] == "user" else "model"
                parts = []
                
                # Check if this message has an image and is the last user message
                if idx == len(messages) - 1 and role == "user" and image_bytes:
                    try:
                        mime = image_mime or "image/jpeg"
                        parts.append(genai_types.Part.from_bytes(data=image_bytes, mime_type=mime))
                    except Exception as img_err:
                        print(f"Error packing image: {img_err}")
                
                content_text = msg.get("content", "").strip()
                if content_text:
                    parts.append(genai_types.Part.from_text(text=content_text))
                elif not parts:
                    parts.append(genai_types.Part.from_text(text="..."))

                contents.append(genai_types.Content(role=role, parts=parts))

            active_system_prompt = system_prompt or ""
            active_max_tokens = max(max_tokens, 8192) if deep_think else max_tokens
            if deep_think and DEEP_THINK_SYSTEM_DIRECTIVE not in active_system_prompt:
                active_system_prompt += DEEP_THINK_SYSTEM_DIRECTIVE

            config = genai_types.GenerateContentConfig(
                system_instruction=active_system_prompt if active_system_prompt else None,
                temperature=temperature,
                max_output_tokens=active_max_tokens,
            )

            # Try candidate models until success
            last_error = None
            streamed_any = False

            for target_model in candidate_models:
                try:
                    def run_stream(m=target_model):
                        return client.models.generate_content_stream(
                            model=m,
                            contents=contents,
                            config=config
                        )

                    response_stream = await asyncio.to_thread(run_stream)

                    for chunk in response_stream:
                        if chunk.text:
                            yield chunk.text
                            streamed_any = True
                            await asyncio.sleep(0.005)

                    if streamed_any:
                        return
                except Exception as model_err:
                    err_text = str(model_err)
                    print(f"Model {target_model} failed: {err_text}")
                    last_error = model_err
                    # If it's a fatal key error, don't retry other models
                    if "API_KEY_INVALID" in err_text or "API key not valid" in err_text:
                        yield "\n\n⚠️ **خطأ:** مفتاح الـ API غير صالح. يرجى التأكد من المفتاح في الإعدادات ⚙️."
                        return
                    # Otherwise continue to next model fallback

            # If all streaming attempts failed, try standard generate_content on gemini-3.5-flash-lite
            try:
                def run_sync():
                    return client.models.generate_content(
                        model="gemini-3.5-flash-lite",
                        contents=contents,
                        config=config
                    )
                fallback_res = await asyncio.to_thread(run_sync)
                if fallback_res.text:
                    yield fallback_res.text
                    return
            except Exception as final_err:
                last_error = final_err

            if last_error:
                raise last_error

        except Exception as e:
            err_str = str(e)
            print(f"Gemini error: {err_str}")
            if "API_KEY_INVALID" in err_str or "API key not valid" in err_str:
                yield "\n\n⚠️ **خطأ:** مفتاح الـ API غير صالح. يرجى التأكد من المفتاح في نافذة الإعدادات ⚙️."
            elif "RESOURCE_EXHAUSTED" in err_str or "Quota exceeded" in err_str or "429" in err_str:
                yield "\n\n⚠️ **تنبيه:** تم تجاوز حد الاستخدام المؤقت (Quota Exceeded). يرجى الانتظار بضع ثوانٍ ثم المحاولة مجدداً."
            else:
                yield f"\n\n⚠️ عذراً، حدث خطأ أثناء المعالجة: {err_str}"

    async def _stream_openai_compatible(
        self,
        settings: Dict[str, Any],
        messages: List[Dict[str, Any]],
        image_bytes: Optional[bytes] = None,
        image_mime: Optional[str] = "image/jpeg",
        deep_think: bool = False,
        system_prompt: Optional[str] = None
    ) -> AsyncGenerator[str, None]:
        api_key = settings.get("openai_api_key", "").strip() or os.getenv("OPENAI_API_KEY", "").strip()
        base_url = settings.get("openai_base_url", "https://api.openai.com/v1").rstrip("/")
        model = settings.get("openai_model", "gpt-4o")
        active_system_prompt = system_prompt or settings.get("system_prompt", "")

        if not api_key:
            yield (
                "👋 **مرحباً بك! تم تفعيل مزود OpenAI بنجاح للوكيل الذكي.**\n\n"
                "🔑 **يرجى تزويدي بمفتاح الـ API الخاص بك لتشغيل النموذج:**\n"
                "- يمكنك كتابة مفتاح الـ API (مثل `sk-...`) هنا في الشات وسأقوم ببرمجته فوراً في الخادم.\n"
                "- أو اضغط على أيقونة **الإعدادات ⚙️** في الزاوية، والصق المفتاح في خانة **OpenAI API Key** ثم اضغط **حفظ الإعدادات**.\n\n"
                "✨ سأنطلق فوراً في خدمتك والرد عليك بدقة باستخدام أحدث نماذج OpenAI!"
            )
            return

        if deep_think and DEEP_THINK_SYSTEM_DIRECTIVE not in active_system_prompt:
            active_system_prompt += DEEP_THINK_SYSTEM_DIRECTIVE

        formatted_messages = []
        if active_system_prompt:
            formatted_messages.append({"role": "system", "content": active_system_prompt})

        for idx, msg in enumerate(messages):
            role = msg["role"]
            if idx == len(messages) - 1 and role == "user" and image_bytes:
                b64_img = base64.b64encode(image_bytes).decode("utf-8")
                mime = image_mime or "image/jpeg"
                content = [
                    {"type": "text", "text": msg.get("content", "")},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{mime};base64,{b64_img}"}
                    }
                ]
                formatted_messages.append({"role": role, "content": content})
            else:
                formatted_messages.append({"role": role, "content": msg.get("content", "")})

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": model,
            "messages": formatted_messages,
            "stream": True,
            "temperature": float(settings.get("temperature", 0.7)),
            "max_tokens": 8192 if deep_think else int(settings.get("max_tokens", 4096))
        }

        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                async with client.stream("POST", f"{base_url}/chat/completions", headers=headers, json=payload) as resp:
                    if resp.status_code != 200:
                        raw_err = (await resp.aread()).decode('utf-8', errors='ignore')
                        try:
                            err_json = json.loads(raw_err)
                            err_msg = err_json.get("error", {}).get("message", raw_err)
                            err_code = err_json.get("error", {}).get("code", "")
                            if err_code == "credit_balance_exhausted" or "quota" in err_msg.lower():
                                yield (
                                    "⚠️ **تنبيه رصيد OpenAI (Credit Balance Exhausted):**\n\n"
                                    "مفتاح الـ API صحيح ومقبول، ولكن حسابك في منصة OpenAI نفد رصيده المالي ولا يحتوي على رصيد ائتماني كافٍ لإجراء المحادثات.\n\n"
                                    "📌 **كيفية الحل:**\n"
                                    "1. يمكنك شحن رصيدك في منصة OpenAI عبر الرابط: [OpenAI Billing](https://platform.openai.com/settings/organization/billing/)\n"
                                    "2. أو يمكنك بكل سهولة التبديل لمزود **Google Gemini** المجاني فائق السرعة عبر الضغط على أيقونة **الإعدادات ⚙️** واختيار Gemini ليعمل معك المساعد فوراً وبلا حدود!"
                                )
                                return
                            elif "invalid_api_key" in err_msg.lower() or resp.status_code == 401:
                                yield "⚠️ **خطأ في مفتاح API الخاص بـ OpenAI:** المفتاح غير صالح أو تم إلغاؤه. يرجى التأكد منه في قائمة الإعدادات ⚙️."
                                return
                        except Exception:
                            err_msg = raw_err
                        yield f"\n\n⚠️ خطأ من مزود OpenAI ({resp.status_code}): {err_msg}"
                        return

                    async for line in resp.aiter_lines():
                        if not line or not line.startswith("data: "):
                            continue
                        data_str = line[6:].strip()
                        if data_str == "[DONE]":
                            break
                        try:
                            data = json.loads(data_str)
                            delta = data["choices"][0].get("delta", {})
                            content = delta.get("content", "")
                            if content:
                                yield content
                        except Exception:
                            continue
        except Exception as e:
            yield f"\n\n⚠️ خطأ في الاتصال: {str(e)}"

    async def generate_title(self, messages: List[Dict[str, Any]]) -> str:
        settings = load_settings()
        provider = settings.get("provider", "gemini")

        summary_input = ""
        for m in messages[:4]:
            role_name = "المستخدم" if m.get("role") == "user" else "سوسو"
            content = m.get("content", "")
            if content:
                summary_input += f"{role_name}: {content[:160]}\n"

        prompt = (
            "اختر عنواناً مناسباً ومختصراً جداً للمحادثة التالية من 2 إلى 4 كلمات فقط باللغة العربية.\n"
            "الشروط:\n"
            "- لا تضع علامات تنصيص ولا نقاط.\n"
            "- لا تكتب مقدمات مثل 'العنوان:' أو 'الموضوع:'.\n"
            "- يجب أن يعبر عن صلب الموضوع بدقة (مثال: 'تحليل صورة سيارة'، 'خطة مهام يومية'، 'استفسار علمي').\n\n"
            f"{summary_input}"
        )

        if provider == "openai_compatible":
            api_key = settings.get("openai_api_key", "").strip() or settings.get("api_key", "").strip()
            base_url = settings.get("openai_base_url", "https://api.openai.com/v1").rstrip("/")
            model = settings.get("openai_model", "gpt-4o-mini")
            if api_key:
                try:
                    headers = {
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json"
                    }
                    payload = {
                        "model": model,
                        "messages": [
                            {"role": "system", "content": "أنت منشئ عناوين محادثات موجزة من 2 إلى 4 كلمات فقط."},
                            {"role": "user", "content": prompt}
                        ],
                        "max_tokens": 50,
                        "temperature": 0.5
                    }
                    async with httpx.AsyncClient(timeout=8.0) as client:
                        resp = await client.post(f"{base_url}/chat/completions", headers=headers, json=payload)
                        if resp.status_code == 200:
                            data = resp.json()
                            title = data["choices"][0]["message"]["content"].strip()
                            title = title.replace('"', '').replace("'", '').replace("العنوان:", "").replace("عنوان:", "").strip()
                            cleaned = title.split("\n")[0][:40]
                            if cleaned:
                                return cleaned
                except Exception as e:
                    print(f"OpenAI Title gen exception: {e}")
        else:
            api_key = settings.get("api_key", "").strip()
            if api_key:
                client = self._get_client(api_key)
                if client:
                    try:
                        def call_gen():
                            return client.models.generate_content(
                                model="gemini-3.5-flash-lite",
                                contents=prompt
                            )
                        res = await asyncio.to_thread(call_gen)
                        if res and res.text:
                            title = res.text.strip().replace('"', '').replace("'", '').replace("العنوان:", "").replace("عنوان:", "").strip()
                            cleaned = title.split("\n")[0][:40]
                            if cleaned:
                                return cleaned
                    except Exception as e:
                        print(f"Gemini Title gen exception: {e}")

        for m in messages:
            if m.get("content"):
                return m["content"].strip().split("\n")[0][:30]
        return "محادثة جديدة"

ai_service = AIService()
