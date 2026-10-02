import os
import re
import uuid
import json
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import edge_tts

from .config import BASE_DIR, load_settings, save_settings, DEFAULT_SYSTEM_PROMPT
from .storage import storage, UPLOADS_DIR
from .ai_service import ai_service
from .image_service import image_service
from .auth_service import auth_service

app = FastAPI(title="SoSo AI API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FRONTEND_DIR = BASE_DIR / "frontend"

class SettingsModel(BaseModel):
    api_key: Optional[str] = None
    provider: Optional[str] = "gemini"
    model: Optional[str] = "gemini-2.5-flash"
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 4096
    system_prompt: Optional[str] = None
    openai_api_key: Optional[str] = None
    openai_base_url: Optional[str] = None
    openai_model: Optional[str] = None
    google_client_id: Optional[str] = None
    google_client_secret: Optional[str] = None

class CreateConversationModel(BaseModel):
    title: Optional[str] = "محادثة جديدة"
    token: Optional[str] = None
    auth_token: Optional[str] = None

class RenameConversationModel(BaseModel):
    title: str

class RegisterModel(BaseModel):
    name: Optional[str] = "مستخدم SoSo"
    email: str
    password: str

class VerifyModel(BaseModel):
    email: str
    code: str

class LoginModel(BaseModel):
    email: str
    password: str

class ResendModel(BaseModel):
    email: str

class GoogleAuthModel(BaseModel):
    email: str
    name: Optional[str] = "مستخدم Google"
    avatar: Optional[str] = None

class LogoutModel(BaseModel):
    token: Optional[str] = None

class ForgotPasswordModel(BaseModel):
    email: str

class ResetPasswordModel(BaseModel):
    email: str
    code: str
    new_password: str

# ==========================================================
# Authentication Endpoints
# ==========================================================
@app.post("/api/auth/register")
def api_register(data: RegisterModel):
    try:
        return auth_service.register(name=data.name or "مستخدم", email=data.email, password=data.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"حدث خطأ أثناء التسجيل: {str(e)}")

@app.post("/api/auth/verify")
def api_verify(response: Response, data: VerifyModel):
    try:
        res = auth_service.verify_code(email=data.email, code=data.code)
        if res.get("token"):
            response.set_cookie(
                key="soso_auth_token",
                value=res["token"],
                max_age=30 * 24 * 3600,
                httponly=False,
                samesite="lax",
                path="/"
            )
        return res
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"حدث خطأ أثناء التحقق: {str(e)}")

@app.post("/api/auth/login")
def api_login(response: Response, data: LoginModel):
    try:
        res = auth_service.login(email=data.email, password=data.password)
        if res.get("token"):
            response.set_cookie(
                key="soso_auth_token",
                value=res["token"],
                max_age=30 * 24 * 3600,
                httponly=False,
                samesite="lax",
                path="/"
            )
        return res
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"حدث خطأ أثناء تسجيل الدخول: {str(e)}")

@app.post("/api/auth/resend")
def api_resend(data: ResendModel):
    try:
        return auth_service.resend_code(email=data.email)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/auth/forgot-password")
def api_forgot_password(data: ForgotPasswordModel):
    try:
        return auth_service.request_password_reset(email=data.email)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"حدث خطأ أثناء إرسال رمز إعادة التعيين: {str(e)}")

@app.post("/api/auth/reset-password")
def api_reset_password(data: ResetPasswordModel):
    try:
        return auth_service.confirm_password_reset(
            email=data.email,
            code=data.code,
            new_password=data.new_password
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"حدث خطأ أثناء تغيير كلمة المرور: {str(e)}")

@app.post("/api/auth/google")
def api_google_auth(data: GoogleAuthModel):
    try:
        return auth_service.google_auth(email=data.email, name=data.name or "مستخدم Google", avatar=data.avatar)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/auth/google/url")
def api_google_url():
    settings = load_settings()
    client_id = (os.getenv("GOOGLE_CLIENT_ID", "") or settings.get("google_client_id", "")).strip()
    redirect_uri = "http://127.0.0.1:8000/api/auth/google/callback"
    if client_id:
        import urllib.parse
        params = urllib.parse.urlencode({
            "client_id": client_id,
            "redirect_uri": redirect_uri,
            "response_type": "code",
            "scope": "openid email profile",
            "prompt": "select_account",
            "access_type": "offline"
        })
        url = f"https://accounts.google.com/o/oauth2/v2/auth?{params}"
        return {
            "has_client_id": True,
            "url": url,
            "client_id": client_id,
            "redirect_uri": redirect_uri
        }
    return {
        "has_client_id": False,
        "redirect_uri": redirect_uri
    }

@app.get("/api/auth/google/callback")
async def api_google_callback(code: Optional[str] = None, error: Optional[str] = None):
    if error:
        err_msg = f"تم إلغاء تسجيل الدخول أو رفض الإذن من طرف Google: {error}"
        html = f"""
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head><meta charset="utf-8"><title>تنبيه تسجيل الدخول</title></head>
        <body style="background:#131314;color:#fff;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center;padding:24px;margin:0;">
          <div style="max-width:440px;background:#1e1f20;border:1px solid #3c4043;border-radius:16px;padding:28px;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            <div style="font-size:40px;margin-bottom:12px;">⚠️</div>
            <h3 style="color:#ea4335;margin:0 0 10px;font-size:1.15rem;">إلغاء المتابعة</h3>
            <p style="color:#bdc1c6;font-size:0.92rem;line-height:1.6;margin:0 0 20px;">{err_msg}</p>
            <button onclick="window.close()" style="background:#4285f4;color:#fff;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-family:inherit;font-weight:600;font-size:0.95rem;">إغلاق النافذة</button>
          </div>
        </body>
        </html>
        """
        return Response(content=html, media_type="text/html")

    if not code:
        return Response(content="<script>window.close();</script>", media_type="text/html")

    settings = load_settings()
    client_id = (os.getenv("GOOGLE_CLIENT_ID", "") or settings.get("google_client_id", "")).strip()
    client_secret = (os.getenv("GOOGLE_CLIENT_SECRET", "") or settings.get("google_client_secret", "")).strip()
    redirect_uri = "http://127.0.0.1:8000/api/auth/google/callback"

    try:
        import urllib.request
        import urllib.parse
        token_data = urllib.parse.urlencode({
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code"
        }).encode("utf-8")
        req = urllib.request.Request(
            "https://oauth2.googleapis.com/token",
            data=token_data,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            method="POST"
        )
        with urllib.request.urlopen(req) as resp:
            token_res = json.loads(resp.read().decode())

        access_token = token_res.get("access_token")
        if not access_token:
            raise ValueError("لم تقم Google بإرجاع رمز الوصول (Access Token)")

        userinfo_req = urllib.request.Request(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        with urllib.request.urlopen(userinfo_req) as resp:
            user_info = json.loads(resp.read().decode())

        email = user_info.get("email", "")
        name = user_info.get("name") or user_info.get("given_name") or "مستخدم Google"
        picture = user_info.get("picture", "")
        auth_res = auth_service.google_auth(email, name, picture)

        payload_json = json.dumps({
            "type": "GOOGLE_SIGNIN_SUCCESS",
            "email": email,
            "name": name,
            "avatar": picture or auth_res["user"].get("avatar"),
            "token": auth_res.get("token"),
            "user": auth_res.get("user")
        }, ensure_ascii=False)

        html = f"""
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head><meta charset="utf-8"><title>تم تسجيل الدخول بنجاح</title></head>
        <body style="background:#131314;color:#fff;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;padding:24px;text-align:center;">
          <div style="max-width:440px;background:#1e1f20;border:1px solid #3c4043;border-radius:16px;padding:32px;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            <div style="font-size:44px;margin-bottom:14px;">🎉</div>
            <h3 style="margin:0 0 8px;color:#fff;font-size:1.25rem;">مرحباً بك، {name}!</h3>
            <p style="color:#9aa0a6;margin:0 0 18px;font-size:0.95rem;">تم توثيق وتسجيل دخولك إلى SoSo AI بنجاح...</p>
            <div style="display:inline-block;width:24px;height:24px;border:3px solid rgba(255,255,255,0.2);border-top-color:#4285f4;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
            <style>@keyframes spin {{ to {{ transform: rotate(360deg); }} }}</style>
            <script>
              const payload = {payload_json};
              try {{
                if (window.opener && !window.opener.closed) {{
                  window.opener.postMessage(payload, "*");
                }}
              }} catch(e) {{}}
              try {{
                localStorage.setItem("soso_google_auth_handoff", JSON.stringify(payload));
              }} catch(e) {{}}
              setTimeout(() => {{
                try {{ window.close(); }} catch(e) {{}}
              }}, 600);
            </script>
          </div>
        </body>
        </html>
        """
        return Response(content=html, media_type="text/html")
    except Exception as e:
        err_msg = str(e)
        html = f"""
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head><meta charset="utf-8"><title>خطأ في مصادقة Google</title></head>
        <body style="background:#131314;color:#fff;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;padding:24px;text-align:center;">
          <div style="max-width:460px;background:#1e1f20;border:1px solid #ea4335;border-radius:16px;padding:28px;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            <div style="font-size:40px;margin-bottom:12px;">⚠️</div>
            <h3 style="color:#ea4335;margin:0 0 10px;font-size:1.15rem;">تعذر استكمال المصادقة من Google</h3>
            <p style="color:#bdc1c6;font-size:0.9rem;line-height:1.6;margin:0 0 16px;">{err_msg}</p>
            <p style="color:#80868b;font-size:0.8rem;line-height:1.5;margin:0 0 20px;">
              تأكد من صحة Client ID و Client Secret في إعدادات SoSo AI وإضافة رابط إعادة التوجيه:<br>
              <code style="color:#8ab4f8;background:#131314;padding:4px 8px;border-radius:6px;display:inline-block;margin-top:6px;direction:ltr;">http://127.0.0.1:8000/api/auth/google/callback</code>
            </p>
            <button onclick="window.close()" style="background:#ea4335;color:#fff;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-family:inherit;font-weight:600;font-size:0.95rem;">إغلاق النافذة</button>
          </div>
        </body>
        </html>
        """
        return Response(content=html, media_type="text/html")

def get_current_user_from_request(request: Request) -> Optional[Dict[str, Any]]:
    token = ""
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        token = auth_header[7:].strip()
    if not token:
        token = request.headers.get("X-Auth-Token", "").strip()
    if not token:
        token = request.cookies.get("soso_auth_token", "").strip()
    if not token:
        token = request.query_params.get("token", "").strip()
    if not token:
        token = request.query_params.get("auth_token", "").strip()
    if not token:
        return None
    return auth_service.get_user_by_token(token)

@app.get("/api/auth/me")
def api_auth_me(request: Request):
    user = get_current_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="الجلسة غير صالحة")
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "avatar": user.get("avatar") or auth_service.get_default_avatar(user["email"]),
        "provider": user.get("provider", "email")
    }

@app.post("/api/auth/avatar")
async def api_upload_avatar(
    request: Request,
    file: UploadFile = File(...)
):
    user = get_current_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="الجلسة غير صالحة، يرجى تسجيل الدخول مجدداً")

    auth_header = request.headers.get("Authorization", "")
    token = auth_header[7:].strip() if auth_header.startswith("Bearer ") else request.query_params.get("token", "")

    ext = Path(file.filename or "").suffix.lower()
    if ext not in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
        ext = ".png"

    filename = f"avatar_{uuid.uuid4().hex[:12]}{ext}"
    dest_path = UPLOADS_DIR / filename
    contents = await file.read()
    with open(dest_path, "wb") as f:
        f.write(contents)

    avatar_url = f"/api/uploads/{filename}"
    updated_user = auth_service.update_avatar(token, avatar_url)
    return {
        "status": "success",
        "avatar": avatar_url,
        "user": {
            "id": updated_user["id"],
            "name": updated_user["name"],
            "email": updated_user["email"],
            "avatar": avatar_url,
            "provider": updated_user.get("provider", "email")
        }
    }

@app.post("/api/auth/logout")
def api_logout(response: Response, data: LogoutModel):
    if data.token:
        auth_service.logout(data.token)
    response.delete_cookie(key="soso_auth_token", path="/")
    return {"status": "logged_out"}

@app.get("/api/conversations")
def get_conversations(request: Request):
    user = get_current_user_from_request(request)
    user_id = user["id"] if user else None
    if not user_id:
        return []
    return storage.list_conversations(user_id=user_id)

@app.post("/api/conversations")
def create_conversation(request: Request, data: CreateConversationModel):
    user = get_current_user_from_request(request)
    if not user and (data.token or data.auth_token):
        user = auth_service.get_user_by_token(data.token or data.auth_token)
    user_id = user["id"] if user else None
    return storage.create_conversation(title=data.title or "محادثة جديدة", user_id=user_id)

@app.get("/api/conversations/{conv_id}")
def get_conversation(conv_id: str, request: Request):
    user = get_current_user_from_request(request)
    user_id = user["id"] if user else None
    conv = storage.get_conversation(conv_id, user_id=user_id)
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conv

@app.delete("/api/conversations/{conv_id}")
def delete_conversation(conv_id: str, request: Request):
    user = get_current_user_from_request(request)
    user_id = user["id"] if user else None
    success = storage.delete_conversation(conv_id, user_id=user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return {"status": "deleted"}

@app.patch("/api/conversations/{conv_id}/title")
def rename_conversation(conv_id: str, data: RenameConversationModel, request: Request):
    user = get_current_user_from_request(request)
    user_id = user["id"] if user else None
    success = storage.update_title(conv_id, data.title, user_id=user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return {"status": "updated", "title": data.title}

@app.delete("/api/conversations")
def clear_all_conversations(request: Request):
    user = get_current_user_from_request(request)
    user_id = user["id"] if user else None
    storage.clear_all(user_id=user_id)
    return {"status": "cleared"}

@app.get("/api/settings")
def get_settings():
    s = load_settings()
    # Mask API keys for safety
    masked = s.copy()
    if masked.get("api_key"):
        key = masked["api_key"]
        masked["api_key_masked"] = key[:4] + "..." + key[-4:] if len(key) > 8 else "***"
        masked["has_api_key"] = True
    else:
        masked["has_api_key"] = False
        masked["api_key_masked"] = ""

    if masked.get("openai_api_key"):
        key = masked["openai_api_key"]
        masked["openai_api_key_masked"] = key[:4] + "..." + key[-4:] if len(key) > 8 else "***"
        masked["has_openai_key"] = True
    else:
        masked["has_openai_key"] = False
        masked["openai_api_key_masked"] = ""

    # Google OAuth fields
    if masked.get("google_client_id"):
        cid = masked["google_client_id"]
        masked["google_client_id_masked"] = cid[:12] + "..." + cid[-12:] if len(cid) > 24 else cid
        masked["has_google_client_id"] = True
    else:
        masked["has_google_client_id"] = False
        masked["google_client_id_masked"] = ""

    if masked.get("google_client_secret"):
        sec = masked["google_client_secret"]
        masked["google_client_secret_masked"] = sec[:3] + "..." + sec[-3:] if len(sec) > 6 else "***"
        masked["has_google_client_secret"] = True
    else:
        masked["has_google_client_secret"] = False
        masked["google_client_secret_masked"] = ""

    # Do not return sensitive raw keys in GET for safety
    masked["api_key"] = ""
    masked["openai_api_key"] = ""
    masked["google_client_secret"] = ""
    masked.pop("system_prompt", None)
    return masked

@app.post("/api/settings")
def update_settings(data: SettingsModel):
    update_data = {}
    for k, v in data.model_dump().items():
        if v is not None:
            # Don't overwrite key if empty string was passed
            if k in ["api_key", "openai_api_key", "google_client_secret"] and not (v.strip() if isinstance(v, str) else v):
                continue
            update_data[k] = v.strip() if isinstance(v, str) else v
    saved = save_settings(update_data)
    return {"status": "success", "settings": saved}

@app.get("/api/uploads/{filename}")
def get_uploaded_image(filename: str):
    file_path = UPLOADS_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(file_path)

class TTSRequest(BaseModel):
    text: str
    voice: Optional[str] = None
    lang: Optional[str] = "ar"
    dialect: Optional[str] = None

def clean_text_for_tts(text: str, lang: Optional[str] = "ar") -> str:
    # 1. Remove markdown code blocks with triple backticks
    is_ar = bool(re.search(r'[\u0600-\u06FF]', text)) or (lang == "ar")
    code_replacement = ' (مقطع برمجي توضيحي) ' if is_ar else ' (code snippet) '
    text = re.sub(r'```[\s\S]*?```', code_replacement, text)
    # Remove inline backticks
    text = re.sub(r'`([^`]+)`', r'\1', text)
    # 2. Remove markdown images & HTML tags
    text = re.sub(r'!\[.*?\]\(.*?\)', '', text)
    text = re.sub(r'<[^>]+>', '', text)
    # 3. Convert markdown links [text](url) -> text, and strip standalone URLs
    text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text)
    text = re.sub(r'https?://\S+', '', text)
    # 4. Table separators
    text = re.sub(r'\|', ' ', text)
    text = re.sub(r':?-{2,}:?', ' ', text)
    # 5. Math symbols & LaTeX
    if is_ar:
        text = text.replace(r'\times', ' ضرب ').replace(r'\div', ' تقسيم ')
        text = text.replace(r'\pm', ' زائد أو ناقص ').replace(r'\approx', ' تقريباً ')
        text = text.replace(r'\leq', ' أصغر من أو يساوي ').replace(r'\geq', ' أكبر من أو يساوي ')
        text = text.replace(r'\neq', ' لا يساوي ').replace(r'\infty', ' ما لا نهاية ')
        text = re.sub(r'\\frac\{([^}]+)\}\{([^}]+)\}', r'\1 على \2', text)
        text = re.sub(r'\\sqrt\{([^}]+)\}', r'جذر \1', text)
    else:
        text = text.replace(r'\times', ' times ').replace(r'\div', ' divided by ')
        text = text.replace(r'\pm', ' plus or minus ').replace(r'\approx', ' approximately ')
        text = text.replace(r'\leq', ' less than or equal to ').replace(r'\geq', ' greater than or equal to ')
        text = text.replace(r'\neq', ' not equal to ').replace(r'\infty', ' infinity ')
        text = re.sub(r'\\frac\{([^}]+)\}\{([^}]+)\}', r'\1 over \2', text)
        text = re.sub(r'\\sqrt\{([^}]+)\}', r'square root of \1', text)
    text = text.replace('$$', ' ').replace('$', ' ')
    # 6. Remove markdown formatting characters
    text = re.sub(r'#{1,6}\s*', '', text)
    text = re.sub(r'[*_~`>#]', '', text)
    text = re.sub(r'-{3,}', '\n', text)
    # 7. Remove bullet symbols at start of lines
    text = re.sub(r'^\s*[-*•]\s+', '', text, flags=re.MULTILINE)
    # 8. Remove emojis and miscellaneous symbols
    text = re.sub(r'[\U00010000-\U0010ffff]', '', text)
    text = re.sub(r'[\u2600-\u27bf\u2300-\u23ff\u2b50\u200d\ufe0f]', '', text)
    # 9. Collapse spaces
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{2,}', '\n', text)
    return text.strip()

def choose_tts_voice(text: str, req_lang: Optional[str] = None, req_voice: Optional[str] = None, req_dialect: Optional[str] = None) -> str:
    if req_voice:
        return req_voice

    combined_hint = f"{req_dialect or ''} {req_lang or ''}".lower().strip()

    # 1. Arabic script
    if re.search(r'[\u0600-\u06FF]', text):
        # Explicit dialect matching
        if "dz" in combined_hint or "algeria" in combined_hint:
            return "ar-DZ-IsmaelNeural"
        if "eg" in combined_hint or "egypt" in combined_hint:
            return "ar-EG-SalmaNeural"
        if "ma" in combined_hint or "morocco" in combined_hint:
            return "ar-MA-JamalNeural"
        if "sy" in combined_hint or "syria" in combined_hint or "levant" in combined_hint:
            return "ar-SY-LaithNeural"
        if "tn" in combined_hint or "tunisia" in combined_hint:
            return "ar-TN-HediNeural"
        if "sa" in combined_hint or "fusha" in combined_hint:
            return "ar-SA-HamedNeural"

        # Content keyword analysis for natural dialect detection
        lower_text = text.lower()
        algerian_keywords = ["واش", "راني", "كاش", "علاش", "بزاف", "مليح", "شكون", "دير", "برك", "صحا", "درك", "هكا", "راك", "شوية", "ديالي", "نتاع", "حبيت", "نخدم", "قاعد", "لاباس", "خويا", "يعطيك الصحة"]
        egyptian_keywords = ["عايز", "ازيك", "ازاي", "كده", "عشان", "دلوقتي", "ايه", "بتاع", "كويس", "برضه", "يا باشا", "ماشي", "حاجة", "دلوقت"]
        moroccan_keywords = ["ديال", "واخا", "زوين", "دابا", "شحال", "فين", "تبارك الله", "مزيان"]
        levantine_keywords = ["شو", "شلونك", "هيك", "بدي", "هلأ", "كتير", "عم بحكي", "منيح", "يا زلمة"]

        score_dz = sum(1 for w in algerian_keywords if w in lower_text)
        score_eg = sum(1 for w in egyptian_keywords if w in lower_text)
        score_ma = sum(1 for w in moroccan_keywords if w in lower_text)
        score_sy = sum(1 for w in levantine_keywords if w in lower_text)

        top_score = max(score_dz, score_eg, score_ma, score_sy)
        if top_score > 0:
            if top_score == score_dz:
                return "ar-DZ-IsmaelNeural"
            if top_score == score_eg:
                return "ar-EG-SalmaNeural"
            if top_score == score_ma:
                return "ar-MA-JamalNeural"
            if top_score == score_sy:
                return "ar-SY-LaithNeural"

        # Default Arabic voice
        if "sa" in combined_hint:
            return "ar-SA-HamedNeural"
        return "ar-DZ-IsmaelNeural"

    # 2. Cyrillic script
    if re.search(r'[\u0400-\u04FF]', text):
        return "ru-RU-SvetlanaNeural"

    # 3. Chinese / Japanese
    if re.search(r'[\u4e00-\u9fff]', text):
        return "zh-CN-XiaoxiaoNeural"
    if re.search(r'[\u3040-\u30ff]', text):
        return "ja-JP-NanamiNeural"

    # 4. Latin texts: word analysis
    words = re.findall(r'\b[a-zA-Záéíóúüñäößàèùâêîôûëïüçğış]+\b', text.lower())
    words_set = set(words)

    spanish_words = {"el", "la", "de", "que", "en", "los", "del", "las", "por", "un", "para", "con", "una", "su", "al", "lo", "como", "más", "pero", "sus", "este", "esta", "es", "está", "estos", "estas", "son", "hola", "cómo", "estás", "bien", "gracias", "muy", "también", "yo", "tú", "él", "ella", "nosotros", "ustedes"}
    german_words = {"der", "die", "und", "in", "den", "von", "zu", "das", "mit", "sich", "des", "auf", "für", "ist", "im", "dem", "nicht", "eine", "einer", "einem", "einen", "als", "auch", "es", "sind", "oder", "aber", "nach", "wir", "ihr", "sie", "hallo", "gut", "danke", "über", "sehr"}
    french_words = {"le", "la", "de", "les", "des", "en", "un", "une", "du", "qui", "dans", "est", "pour", "pas", "sur", "ce", "cette", "plus", "avec", "sont", "mais", "nous", "vous", "ils", "elles", "bonjour", "merci", "très", "bien", "aussi", "faire"}
    turkish_words = {"ve", "bir", "bu", "da", "de", "için", "ile", "çok", "ne", "gibi", "daha", "kadar", "her", "olan", "var", "merhaba", "teşekkürler", "nasıl"}
    english_words = {"the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "is", "are", "was", "were", "hello", "thank", "thanks", "what", "how", "can", "here", "there", "will", "all", "your", "my"}

    score_es = len(words_set.intersection(spanish_words)) * 2 + (4 if any(c in text for c in "ñ¿¡") else 0)
    score_de = len(words_set.intersection(german_words)) * 2 + (4 if any(c in text for c in "äöß") else 0)
    score_fr = len(words_set.intersection(french_words)) * 2 + (4 if any(c in text for c in "œ") else 0)
    score_tr = len(words_set.intersection(turkish_words)) * 2 + (4 if any(c in text for c in "ğış") else 0)
    score_en = len(words_set.intersection(english_words)) * 2

    hint = combined_hint
    if "es" in hint: score_es += 1.5
    elif "de" in hint: score_de += 1.5
    elif "fr" in hint: score_fr += 1.5
    elif "tr" in hint: score_tr += 1.5
    elif "en" in hint: score_en += 1.5

    scores = {
        "es": score_es,
        "de": score_de,
        "fr": score_fr,
        "tr": score_tr,
        "en": score_en
    }

    best_lang = max(scores, key=scores.get)
    if scores[best_lang] > 1.5:
        if best_lang == "es": return "es-ES-ElviraNeural"
        if best_lang == "de": return "de-DE-KatjaNeural"
        if best_lang == "fr": return "fr-FR-DeniseNeural"
        if best_lang == "tr": return "tr-TR-AhmetNeural"
        if best_lang == "en": return "en-US-JennyNeural"

    if "es" in hint: return "es-ES-ElviraNeural"
    if "de" in hint: return "de-DE-KatjaNeural"
    if "fr" in hint: return "fr-FR-DeniseNeural"
    if "tr" in hint: return "tr-TR-AhmetNeural"

    return "en-US-JennyNeural"

@app.post("/api/tts")
async def generate_speech_endpoint(req: TTSRequest):
    cleaned = clean_text_for_tts(req.text, req.lang)
    if not cleaned:
        raise HTTPException(status_code=400, detail="Empty text after cleaning")

    voice = choose_tts_voice(cleaned, req.lang, req.voice, req.dialect)

    try:
        communicate = edge_tts.Communicate(cleaned, voice)
        audio_buffer = bytearray()
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_buffer.extend(chunk["data"])

        if not audio_buffer:
            raise HTTPException(status_code=500, detail="Failed to synthesize speech")

        return Response(content=bytes(audio_buffer), media_type="audio/mpeg")
    except Exception as e:
        print(f"TTS Error ({voice}): {e}")
        raise HTTPException(status_code=500, detail=str(e))

class ImageGenerateRequest(BaseModel):
    prompt: str
    style: Optional[str] = "photorealistic"
    aspect_ratio: Optional[str] = "1:1"
    model: Optional[str] = "flux"
    seed: Optional[int] = None

@app.post("/api/images/generate")
async def api_generate_image(req: ImageGenerateRequest):
    try:
        result = await image_service.generate_image(
            prompt=req.prompt,
            style=req.style or "photorealistic",
            aspect_ratio=req.aspect_ratio or "1:1",
            model=req.model or "flux",
            seed=req.seed
        )
        return result
    except Exception as e:
        print(f"Image generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/images/edit")
async def api_edit_image(
    instruction: str = Form(...),
    style: Optional[str] = Form("photorealistic"),
    aspect_ratio: Optional[str] = Form("1:1"),
    image: Optional[UploadFile] = File(None),
    image_url: Optional[str] = Form(None)
):
    try:
        image_bytes = None
        if image and image.filename:
            image_bytes = await image.read()
        elif image_url:
            clean_name = image_url.split("/")[-1].split("?")[0]
            local_path = UPLOADS_DIR / clean_name
            if local_path.exists():
                with open(local_path, "rb") as f:
                    image_bytes = f.read()

        if not image_bytes:
            raise HTTPException(status_code=400, detail="No image provided for editing")

        result = await image_service.edit_image_with_ai(
            image_bytes=image_bytes,
            edit_instruction=instruction,
            style=style or "photorealistic",
            aspect_ratio=aspect_ratio or "1:1"
        )
        return result
    except Exception as e:
        print(f"Image edit error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat")
async def chat_endpoint(
    request: Request,
    conversation_id: str = Form(...),
    message: str = Form(""),
    image: Optional[UploadFile] = File(None),
    deep_think: Optional[str] = Form("false"),
    client_timestamp: Optional[str] = Form(None),
    client_timezone: Optional[str] = Form(None),
    client_time_str: Optional[str] = Form(None),
    system_override: Optional[str] = Form(None),
    auth_token: Optional[str] = Form(None),
    token: Optional[str] = Form(None)
):
    user = get_current_user_from_request(request)
    eff_tok = auth_token or token
    if not user and eff_tok:
        user = auth_service.get_user_by_token(eff_tok)
    user_id = user["id"] if user else None

    is_deep = str(deep_think).lower() in ("true", "1", "yes")
    # For ephemeral follow-up question generation: skip storage and use system_override
    is_followup = system_override is not None and conversation_id.startswith("followup_ephemeral_")
    image_bytes = None
    image_mime = None
    image_url = None

    if image and image.filename:
        image_bytes = await image.read()
        image_mime = image.content_type or "image/jpeg"
        # Save image to disk
        ext = Path(image.filename).suffix or ".jpg"
        unique_name = f"{uuid.uuid4()}{ext}"
        saved_path = UPLOADS_DIR / unique_name
        with open(saved_path, "wb") as f:
            f.write(image_bytes)
        image_url = f"/api/uploads/{unique_name}"

    # For ephemeral follow-up: skip storage entirely
    if not is_followup:
        storage.add_message(
            conv_id=conversation_id,
            role="user",
            content=message,
            image_url=image_url,
            user_id=user_id
        )

    # Get conversation history (empty list for ephemeral calls)
    if is_followup:
        history = [{"role": "system", "content": system_override}, {"role": "user", "content": message}]
    else:
        conv = storage.get_conversation(conversation_id, user_id=user_id)
        history = conv["messages"] if conv else []

    clean_m = message.strip()
    image_prefixes = [
        "ارسم", "انشئ صورة", "أنشئ صورة", "صمم صورة", "توليد صورة", "رسم صورة",
        "اعملي صورة", "صنع صورة", "/image", "draw an image", "generate image",
        "create an image", "draw a ", "generate a picture", "draw ", "paint "
    ]
    is_image_intent = any(clean_m.lower().startswith(kw) for kw in image_prefixes) and not image_bytes and not is_followup

    async def event_generator():
        full_response = []
        try:
            if is_followup:
                # Ephemeral call: use custom system prompt, stream AI response directly
                # Build a minimal messages list (system + user only)
                followup_msgs = [
                    {"role": "system", "content": system_override},
                    {"role": "user", "content": message}
                ]
                async for chunk in ai_service.stream_chat(
                    messages=followup_msgs,
                    image_bytes=None,
                    image_mime=None,
                    deep_think=False,
                    client_timestamp=None,
                    client_timezone=None,
                    client_time_str=None
                ):
                    full_response.append(chunk)
                    payload = json.dumps({"text": chunk}, ensure_ascii=False)
                    yield f"data: {payload}\n\n"
                # Return immediately — no storage, no title, no end_payload needed
                return

            elif is_image_intent:
                prompt_text = clean_m
                for kw in image_prefixes:
                    if prompt_text.lower().startswith(kw):
                        prompt_text = prompt_text[len(kw):].strip(": -،,")
                        break
                if not prompt_text:
                    prompt_text = clean_m

                status_msg = "🎨 **جاري تصميم وإنشاء الصورة بدقة فائقة وبدون علامة مائية...**\n\n"
                yield f"data: {json.dumps({'text': status_msg}, ensure_ascii=False)}\n\n"

                try:
                    img_res = await image_service.generate_image(prompt=prompt_text)
                    img_url = img_res["image_url"]
                    img_md = (
                        f"![{prompt_text}]({img_url})\n\n"
                        f"✨ **تم إنشاء الصورة بنجاح وبدون أي علامة مائية!**\n\n"
                        f"[📥 تحميل بدقة فائقة]({img_url})  •  [🎨 تعديل في الاستوديو](#studio:{img_url})"
                    )
                    yield f"data: {json.dumps({'text': img_md}, ensure_ascii=False)}\n\n"
                    full_response.append(f"{status_msg}{img_md}")
                except Exception as img_err:
                    err_msg = f"⚠️ تعذر إنشاء الصورة: {str(img_err)}"
                    yield f"data: {json.dumps({'text': err_msg}, ensure_ascii=False)}\n\n"
                    full_response.append(err_msg)
            else:
                async for chunk in ai_service.stream_chat(
                    messages=history,
                    image_bytes=image_bytes,
                    image_mime=image_mime,
                    deep_think=is_deep,
                    client_timestamp=client_timestamp,
                    client_timezone=client_timezone,
                    client_time_str=client_time_str
                ):
                    full_response.append(chunk)
                    payload = json.dumps({"text": chunk}, ensure_ascii=False)
                    yield f"data: {payload}\n\n"

            final_text = "".join(full_response)
            # Save assistant message to storage
            msg_obj = storage.add_message(
                conv_id=conversation_id,
                role="assistant",
                content=final_text,
                deep_think=is_deep,
                user_id=user_id
            )

            # Generate smart title if this conversation is new or has a generic title
            new_title = None
            conv_current = storage.get_conversation(conversation_id, user_id=user_id)
            if conv_current:
                curr_title = conv_current.get("title", "")
                msg_count = len(conv_current.get("messages", []))
                if msg_count <= 4 or curr_title in ["محادثة جديدة", "New Chat", ""]:
                    try:
                        smart_title = await ai_service.generate_title(conv_current.get("messages", []))
                        if smart_title and smart_title != "محادثة جديدة":
                            storage.update_title(conversation_id, smart_title, user_id=user_id)
                            new_title = smart_title
                    except Exception as title_err:
                        print(f"Error updating title: {title_err}")

            end_payload = json.dumps({
                "done": True,
                "message": msg_obj,
                "new_title": new_title,
                "deep_think": is_deep
            }, ensure_ascii=False)
            yield f"data: {end_payload}\n\n"

        except Exception as e:
            err_payload = json.dumps({"error": str(e)}, ensure_ascii=False)
            yield f"data: {err_payload}\n\n"


    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )

# Mount frontend files
if FRONTEND_DIR.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
