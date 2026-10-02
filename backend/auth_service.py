import os
import json
import time
import uuid
import smtplib
import secrets
import hashlib
import threading
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from pathlib import Path
from typing import Optional, Dict, Any, List

from .config import DATA_DIR, load_settings

USERS_FILE = DATA_DIR / "users.json"

def _attach_logo_if_exists(msg: MIMEMultipart) -> bool:
    try:
        logo_path = Path(__file__).parent.parent / "frontend" / "assets" / "apple-touch-icon.png"
        if not logo_path.exists():
            logo_path = Path(__file__).parent.parent / "frontend" / "assets" / "logo_icon.png"
        if logo_path.exists():
            with open(logo_path, "rb") as f:
                logo_data = f.read()
            logo_img = MIMEImage(logo_data, _subtype="png")
            logo_img.add_header("Content-ID", "<soso_logo>")
            logo_img.add_header("Content-Disposition", "inline", filename="logo.png")
            msg.attach(logo_img)
            return True
    except Exception as e:
        print(f"[AUTH] Could not attach logo to email: {e}")
    return False

def _hash_password(password: str, salt: Optional[str] = None) -> tuple[str, str]:
    if not salt:
        salt = secrets.token_hex(16)
    hashed = hashlib.sha256((salt + password).encode("utf-8")).hexdigest()
    return hashed, salt

def _verify_password(password: str, hashed: str, salt: str) -> bool:
    test_hash, _ = _hash_password(password, salt)
    return test_hash == hashed

def generate_secure_random_code(length: int = 6) -> str:
    """
    Generates a cryptographically strong, non-common, highly randomized verification code.
    Ensures:
    - Never uses common codes like 123456, 111111, 000000, 654321, etc.
    - No adjacent identical digits (no 11, 22, 33...)
    - No adjacent consecutive digits (no 12, 23, 34, 54, 87, 98...)
    - All 6 digits are unique (maximum entropy, zero repetition)
    - No leading zero
    - No palindrome structures
    """
    for _ in range(5000):
        digits = "".join(str(secrets.randbelow(10)) for _ in range(length))
        if digits[0] == "0":
            continue
        # Strict rule: no adjacent identical or consecutive digits (|d[i] - d[i+1]| <= 1 is forbidden)
        d_ints = [int(x) for x in digits]
        if any(abs(d_ints[i+1] - d_ints[i]) <= 1 for i in range(len(d_ints)-1)):
            continue
        # Max occurrence of any digit is 1 (all digits unique in 6-digit code)
        if len(set(digits)) < length:
            continue
        if digits == digits[::-1]:
            continue
        return digits

    return "839164"

class AuthService:
    def __init__(self):
        self._ensure_file()

    def _ensure_file(self):
        if not USERS_FILE.exists():
            with open(USERS_FILE, "w", encoding="utf-8") as f:
                json.dump([], f, ensure_ascii=False, indent=2)

    def _read_users(self) -> List[Dict[str, Any]]:
        self._ensure_file()
        try:
            with open(USERS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []

    def _write_users(self, users: List[Dict[str, Any]]):
        with open(USERS_FILE, "w", encoding="utf-8") as f:
            json.dump(users, f, ensure_ascii=False, indent=2)

    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        users = self._read_users()
        email_clean = email.strip().lower()
        for u in users:
            if u.get("email", "").lower() == email_clean:
                return u
        return None

    def get_default_avatar(self, email: str) -> Optional[str]:
        return None

    def get_user_by_token(self, token: str) -> Optional[Dict[str, Any]]:
        if not token:
            return None
        users = self._read_users()
        modified = False
        target_user = None
        for u in users:
            if u.get("session_token") == token:
                if u.get("avatar") and "user_avatar_sefiane" in str(u.get("avatar")):
                    u["avatar"] = None
                    modified = True
                target_user = u
                break
        if modified:
            self._write_users(users)
        return target_user

    def register(self, name: str, email: str, password: str) -> Dict[str, Any]:
        email_clean = email.strip().lower()
        name_clean = name.strip()
        if not email_clean or "@" not in email_clean:
            raise ValueError("يرجى إدخال بريد إلكتروني صحيح")
        if len(password) < 6:
            raise ValueError("يجب أن تتكون كلمة المرور من 6 أحرف أو أرقام على الأقل")

        users = self._read_users()
        existing = None
        for u in users:
            if u.get("email", "").lower() == email_clean:
                existing = u
                break

        if existing and existing.get("verified", False):
            raise ValueError("هذا البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول")

        code = generate_secure_random_code()
        expiry = time.time() + (15 * 60)  # 15 minutes
        hashed, salt = _hash_password(password)

        if existing:
            existing["name"] = name_clean or existing.get("name", "مستخدم")
            existing["password_hash"] = hashed
            existing["password_salt"] = salt
            existing["verification_code"] = code
            existing["code_expiry"] = expiry
            existing["updated_at"] = time.time()
        else:
            new_user = {
                "id": str(uuid.uuid4()),
                "name": name_clean or "مستخدم SoSo",
                "email": email_clean,
                "avatar": self.get_default_avatar(email_clean),
                "password_hash": hashed,
                "password_salt": salt,
                "provider": "email",
                "verified": False,
                "verification_code": code,
                "code_expiry": expiry,
                "session_token": None,
                "created_at": time.time(),
                "updated_at": time.time()
            }
            users.append(new_user)

        self._write_users(users)

        # Attempt to send real email via SMTP
        email_sent = self._send_verification_email(email_clean, name_clean, code)

        if email_sent:
            msg = f"تم إرسال كود التفعيل المكون من 6 أرقام إلى بريدك الإلكتروني ({email_clean}) بنجاح. تفقد صندوق الوارد أو الرسائل غير المرغوب فيها (Spam)."
        else:
            msg = "خادم SMTP غير مربوط في ملف .env، تعذر إرسال الرسالة إلى بريدك تلقائياً."

        return {
            "status": "pending_verification",
            "email": email_clean,
            "email_sent": email_sent,
            "preview_code": None if email_sent else code,
            "message": msg
        }

    def verify_code(self, email: str, code: str) -> Dict[str, Any]:
        email_clean = email.strip().lower()
        code_clean = code.strip()

        users = self._read_users()
        target = None
        for u in users:
            if u.get("email", "").lower() == email_clean:
                target = u
                break

        if not target:
            raise ValueError("لم يتم العثور على حساب بهذا البريد الإلكتروني")

        saved_code = str(target.get("verification_code", "")).strip()
        expiry = target.get("code_expiry", 0)

        if time.time() > expiry:
            raise ValueError("انتهت صلاحية كود التفعيل، يرجى طلب كود جديد")

        if saved_code != code_clean:
            raise ValueError("كود التفعيل غير صحيح، يرجى التأكد وإعادة المحاولة")

        # Mark verified and create session token
        token = secrets.token_hex(32)
        avatar = target.get("avatar")
        if avatar and "user_avatar_sefiane" in str(avatar):
            avatar = None
        target["verified"] = True
        target["verification_code"] = None
        target["code_expiry"] = None
        target["session_token"] = token
        target["last_login"] = time.time()
        target["avatar"] = avatar
        self._write_users(users)

        # Send Welcome Email with privileges asynchronously
        try:
            user_display_name = target.get("name") or "صديقنا"
            threading.Thread(
                target=self._send_welcome_email,
                args=(target["email"], user_display_name),
                daemon=True
            ).start()
        except Exception as e:
            print(f"[AUTH] Background welcome email dispatch failed: {e}")

        return {
            "status": "success",
            "token": token,
            "user": {
                "id": target["id"],
                "name": target["name"],
                "email": target["email"],
                "avatar": avatar,
                "provider": target.get("provider", "email")
            }
        }

    def resend_code(self, email: str) -> Dict[str, Any]:
        email_clean = email.strip().lower()
        users = self._read_users()
        target = None
        for u in users:
            if u.get("email", "").lower() == email_clean:
                target = u
                break

        if not target:
            raise ValueError("البريد الإلكتروني غير مسجل")

        code = generate_secure_random_code()
        target["verification_code"] = code
        target["code_expiry"] = time.time() + (15 * 60)
        self._write_users(users)

        email_sent = self._send_verification_email(email_clean, target.get("name", "مستخدم"), code)
        if email_sent:
            msg = f"تمت إعادة إرسال كود التفعيل إلى بريدك ({email_clean}) بنجاح."
        else:
            msg = "تم طلب كود تفعيل جديد. يُرجى مراجعة صندوق بريدك الإلكتروني."

        return {
            "status": "success",
            "email_sent": email_sent,
            "preview_code": None if email_sent else code,
            "message": msg
        }

    def login(self, email: str, password: str) -> Dict[str, Any]:
        email_clean = email.strip().lower()
        users = self._read_users()
        target = None
        for u in users:
            if u.get("email", "").lower() == email_clean:
                target = u
                break

        if not target:
            raise ValueError("البريد الإلكتروني أو كلمة المرور غير صحيحة")

        if not _verify_password(password, target.get("password_hash", ""), target.get("password_salt", "")):
            raise ValueError("البريد الإلكتروني أو كلمة المرور غير صحيحة")

        if not target.get("verified", False):
            # Resend verification code automatically
            code = generate_secure_random_code()
            target["verification_code"] = code
            target["code_expiry"] = time.time() + (15 * 60)
            self._write_users(users)
            email_sent = self._send_verification_email(email_clean, target.get("name", ""), code)
            return {
                "status": "unverified",
                "email": email_clean,
                "email_sent": email_sent,
                "message": "الحساب غير مفعل بعد، يرجى إدخال كود التفعيل المرسل إلى بريدك الإلكتروني"
            }

        token = secrets.token_hex(32)
        avatar = target.get("avatar")
        if avatar and "user_avatar_sefiane" in str(avatar):
            avatar = None
        target["session_token"] = token
        target["last_login"] = time.time()
        target["avatar"] = avatar
        self._write_users(users)

        return {
            "status": "success",
            "token": token,
            "user": {
                "id": target["id"],
                "name": target["name"],
                "email": target["email"],
                "avatar": avatar,
                "provider": target.get("provider", "email")
            }
        }

    def request_password_reset(self, email: str) -> Dict[str, Any]:
        email_clean = email.strip().lower()
        if not email_clean or "@" not in email_clean:
            raise ValueError("يرجى إدخال بريد إلكتروني صالح")

        users = self._read_users()
        target = None
        for u in users:
            if u.get("email", "").lower() == email_clean:
                target = u
                break

        if not target:
            raise ValueError("لم يتم العثور على أي حساب مسجل بهذا البريد الإلكتروني")

        # Generate unique high-entropy random code
        code = generate_secure_random_code()
        target["reset_code"] = code
        target["reset_expiry"] = time.time() + (15 * 60)  # 15 minutes
        target["updated_at"] = time.time()
        self._write_users(users)

        email_sent = self._send_password_reset_email(email_clean, target.get("name", "مستخدم"), code)

        if email_sent:
            msg = f"تم إرسال رمز إعادة تعيين كلمة المرور إلى ({email_clean}) بنجاح. تفقد صندوق الوارد أو الرسائل غير المرغوب فيها (Spam)."
        else:
            msg = "تم إنشاء رمز التحقق. يمكنك إدخال الرمز أو إظهاره للمتابعة."

        return {
            "status": "success",
            "email": email_clean,
            "email_sent": email_sent,
            "preview_code": None if email_sent else code,
            "message": msg
        }

    def confirm_password_reset(self, email: str, code: str, new_password: str) -> Dict[str, Any]:
        email_clean = email.strip().lower()
        code_clean = str(code).strip()

        if not email_clean:
            raise ValueError("البريد الإلكتروني مطلوب")

        if not new_password or len(new_password) < 6:
            raise ValueError("يجب أن تتكون كلمة المرور الجديدة من 6 خانات على الأقل")

        users = self._read_users()
        target = None
        for u in users:
            if u.get("email", "").lower() == email_clean:
                target = u
                break

        if not target:
            raise ValueError("لم يتم العثور على حساب بهذا البريد الإلكتروني")

        saved_code = str(target.get("reset_code", "")).strip()
        expiry = target.get("reset_expiry", 0)

        if not saved_code:
            raise ValueError("لم يتم طلب إعادة تعيين كلمة المرور أو تم استخدام الرمز مسبقاً")

        if time.time() > expiry:
            raise ValueError("انتهت صلاحية رمز إعادة التعيين، يرجى طلب رمز جديد")

        if saved_code != code_clean:
            raise ValueError("رمز التحقق غير صحيح، يرجى التأكد وإعادة المحاولة")

        # Hash new password with fresh salt
        hashed, salt = _hash_password(new_password)
        target["password_hash"] = hashed
        target["password_salt"] = salt
        target["reset_code"] = None
        target["reset_expiry"] = None
        target["session_token"] = None  # Invalidate old sessions for security
        target["updated_at"] = time.time()
        self._write_users(users)

        return {
            "status": "success",
            "message": "تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة."
        }

    def google_auth(self, email: str, name: str, avatar: Optional[str] = None) -> Dict[str, Any]:
        email_clean = email.strip().lower()
        if not email_clean or "@" not in email_clean:
            raise ValueError("بريد جوجل غير صالح")

        users = self._read_users()
        target = None
        for u in users:
            if u.get("email", "").lower() == email_clean:
                target = u
                break

        final_avatar = avatar or (target.get("avatar") if target else None)
        if final_avatar and "user_avatar_sefiane" in str(final_avatar):
            final_avatar = None

        token = secrets.token_hex(32)
        is_new_user = False
        if target:
            target["verified"] = True
            target["session_token"] = token
            target["last_login"] = time.time()
            target["avatar"] = final_avatar
            if name:
                target["name"] = name
        else:
            is_new_user = True
            target = {
                "id": str(uuid.uuid4()),
                "name": name or "مستخدم Google",
                "email": email_clean,
                "avatar": final_avatar,
                "provider": "google",
                "verified": True,
                "session_token": token,
                "created_at": time.time(),
                "last_login": time.time()
            }
            users.append(target)

        self._write_users(users)

        if is_new_user:
            try:
                user_display_name = target.get("name") or "مستخدم Google"
                threading.Thread(
                    target=self._send_welcome_email,
                    args=(target["email"], user_display_name),
                    daemon=True
                ).start()
            except Exception as e:
                print(f"[AUTH] Background welcome email dispatch for Google user failed: {e}")

        return {
            "status": "success",
            "token": token,
            "user": {
                "id": target["id"],
                "name": target["name"],
                "email": target["email"],
                "avatar": target.get("avatar"),
                "provider": "google"
            }
        }

    def logout(self, token: str) -> bool:
        if not token:
            return True
        users = self._read_users()
        for u in users:
            if u.get("session_token") == token:
                u["session_token"] = None
                self._write_users(users)
                return True
        return True

    def update_avatar(self, token_or_email: str, avatar_url: str) -> Optional[Dict[str, Any]]:
        if not token_or_email or not avatar_url:
            return None
        users = self._read_users()
        clean_target = token_or_email.strip().lower()
        matched = None
        for u in users:
            if u.get("session_token") == token_or_email or u.get("email", "").lower() == clean_target:
                u["avatar"] = avatar_url
                u["updated_at"] = time.time()
                matched = u
                break
        if matched:
            self._write_users(users)
        return matched

    def _send_verification_email(self, to_email: str, user_name: str, code: str) -> bool:
        settings = load_settings()
        smtp_host = os.getenv("SMTP_HOST", "") or settings.get("smtp_host", "")
        smtp_port = int(os.getenv("SMTP_PORT", 0) or settings.get("smtp_port", 587) or 587)
        smtp_user = os.getenv("SMTP_USER", "") or settings.get("smtp_user", "")
        smtp_pass = os.getenv("SMTP_PASSWORD", "") or settings.get("smtp_password", "")
        smtp_from = os.getenv("SMTP_FROM", "") or settings.get("smtp_from", "") or smtp_user or "noreply@soso-ai.app"

        if not smtp_host or not smtp_user or not smtp_pass:
            print(f"[AUTH] SMTP is not fully configured in .env. To send real emails, set SMTP_USER and SMTP_PASSWORD.")
            return False

        sender_name = "SoSo AI"
        sender_email = smtp_from

        try:
            msg = MIMEMultipart("related")
            msg_alt = MIMEMultipart("alternative")
            msg.attach(msg_alt)

            msg["Subject"] = f"رمز تأكيد حسابك في SoSo AI: {code}"
            msg["From"] = f'"{sender_name}" <{sender_email}>'
            msg["To"] = to_email
            msg["Reply-To"] = sender_email

            text_plain = f"أهلاً بك {user_name}!\nرمز تفعيل حسابك في SoSo AI هو: {code}\nصلاحية الرمز 15 دقيقة.\nإذا لم تكن قد طلبت إنشاء هذا الحساب، يمكنك تجاهل هذه الرسالة."
            
            html_content = f"""
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>رمز تفعيل SoSo AI</title>
            </head>
            <body style="margin:0;padding:20px;background-color:#0f1219;font-family:'Segoe UI',Tahoma,Arial,sans-serif;color:#ffffff;direction:rtl;text-align:right;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:520px;margin:0 auto;background-color:#161b27;border:1px solid #2a3449;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.55);">
                <!-- Header with Logo -->
                <tr>
                  <td style="padding:28px 24px 20px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.08);background:linear-gradient(135deg, rgba(255,122,0,0.18), rgba(234,88,12,0.25));">
                    <img src="cid:soso_logo" width="62" height="62" alt="SoSo AI" style="display:block;margin:0 auto 10px;border-radius:16px;border:1.5px solid rgba(255,122,0,0.4);box-shadow:0 4px 16px rgba(255,122,0,0.3);">
                    <h1 style="margin:0;font-size:24px;font-weight:800;color:#FF7A00;letter-spacing:-0.5px;">SoSo AI</h1>
                    <p style="margin:4px 0 0;font-size:13px;color:#cbd5e1;">مساعدك الذكي ورفيقك المعرفي اليومي</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:28px 24px;">
                    <h2 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#ffffff;">مرحباً بك، {user_name}! 👋</h2>
                    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#bdc1c6;">
                      شكراً لتسجيلك في SoSo AI. لتأكيد وتفعيل بريدك الإلكتروني والبدء في استخدام كافة ميزات المنصة، استخدم رمز التحقق التالي:
                    </p>

                    <!-- Verification Code Box -->
                    <div style="background:#0f1219;border:2px solid #FF7A00;border-radius:14px;padding:18px 20px;text-align:center;margin:24px 0;box-shadow:0 4px 20px rgba(255,122,0,0.15);">
                      <span style="font-family:'Courier New',Courier,monospace;font-size:32px;font-weight:800;letter-spacing:10px;color:#FF7A00;display:inline-block;padding-left:10px;">
                        {code}
                      </span>
                    </div>

                    <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;text-align:center;">
                      ⏱️ هذا الرمز صالح لمدة <strong>15 دقيقة</strong> فقط.
                    </p>
                    <p style="margin:0;font-size:12px;color:#64748b;text-align:center;line-height:1.5;">
                      إذا لم تقم بطلب هذا الحساب، يرجى تجاهل هذه الرسالة بأمان تام.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:16px 24px;background-color:#121620;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                    <p style="margin:0;font-size:11px;color:#64748b;">
                      تم إرسال هذه الرسالة تلقائياً بواسطة نظام الحماية في SoSo AI • جميع الحقوق محفوظة © 2026
                    </p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """

            msg_alt.attach(MIMEText(text_plain, "plain", "utf-8"))
            msg_alt.attach(MIMEText(html_content, "html", "utf-8"))
            _attach_logo_if_exists(msg)

            if smtp_port == 465:
                with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=12) as server:
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)
            else:
                with smtplib.SMTP(smtp_host, smtp_port, timeout=12) as server:
                    server.ehlo()
                    server.starttls()
                    server.ehlo()
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)

            print(f"[AUTH] Successfully sent live verification email to {to_email}")
            return True
        except Exception as e:
            print(f"[AUTH] Failed to send verification email to {to_email} via {smtp_host}:{smtp_port}: {e}")
            return False

    def _send_password_reset_email(self, to_email: str, user_name: str, code: str) -> bool:
        settings = load_settings()
        smtp_host = os.getenv("SMTP_HOST", "") or settings.get("smtp_host", "")
        smtp_port = int(os.getenv("SMTP_PORT", 0) or settings.get("smtp_port", 587) or 587)
        smtp_user = os.getenv("SMTP_USER", "") or settings.get("smtp_user", "")
        smtp_pass = os.getenv("SMTP_PASSWORD", "") or settings.get("smtp_password", "")
        smtp_from = os.getenv("SMTP_FROM", "") or settings.get("smtp_from", "") or smtp_user or "noreply@soso-ai.app"

        if not smtp_host or not smtp_user or not smtp_pass:
            print(f"[AUTH] SMTP is not fully configured in .env.")
            return False

        sender_name = "SoSo AI"
        sender_email = smtp_from

        try:
            msg = MIMEMultipart("related")
            msg_alt = MIMEMultipart("alternative")
            msg.attach(msg_alt)

            msg["Subject"] = f"رمز إعادة تعيين كلمة المرور في SoSo AI: {code}"
            msg["From"] = f'"{sender_name}" <{sender_email}>'
            msg["To"] = to_email
            msg["Reply-To"] = sender_email

            text_plain = f"أهلاً بك {user_name}!\nرمز إعادة تعيين كلمة المرور الخاص بك في SoSo AI هو: {code}\nصلاحية الرمز 15 دقيقة.\nإذا لم تكن قد طلبت ذلك، يرجى تجاهل هذه الرسالة."

            html_content = f"""
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>إعادة تعيين كلمة المرور</title>
            </head>
            <body style="margin:0;padding:20px;background-color:#0f1219;font-family:'Segoe UI',Tahoma,Arial,sans-serif;color:#ffffff;direction:rtl;text-align:right;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:520px;margin:0 auto;background-color:#161b27;border:1px solid #2a3449;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.55);">
                <tr>
                  <td style="padding:28px 24px 20px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.08);background:linear-gradient(135deg, rgba(234,67,53,0.18), rgba(249,115,22,0.22));">
                    <img src="cid:soso_logo" width="62" height="62" alt="SoSo AI" style="display:block;margin:0 auto 10px;border-radius:16px;border:1.5px solid rgba(255,122,0,0.4);box-shadow:0 4px 16px rgba(255,122,0,0.3);">
                    <h1 style="margin:0;font-size:24px;font-weight:800;color:#FF7A00;letter-spacing:-0.5px;">SoSo AI</h1>
                    <p style="margin:4px 0 0;font-size:13px;color:#cbd5e1;">استعادة الحساب والأمان</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 24px;">
                    <h2 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#ffffff;">مرحباً بك، {user_name}! 🔑</h2>
                    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#bdc1c6;">
                      لقد تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك في <strong>SoSo AI</strong>. استخدم الرمز السري التالي لإتمام عملية تغيير كلمة المرور:
                    </p>
                    <div style="background:#0f1219;border:2px solid #ea4335;border-radius:14px;padding:18px 20px;text-align:center;margin:24px 0;box-shadow:0 4px 20px rgba(234,67,53,0.15);">
                      <span style="font-family:'Courier New',Courier,monospace;font-size:32px;font-weight:800;letter-spacing:10px;color:#ea4335;display:inline-block;padding-left:10px;">
                        {code}
                      </span>
                    </div>
                    <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;text-align:center;">
                      ⏱️ هذا الرمز صالح لمدة <strong>15 دقيقة</strong> فقط.
                    </p>
                    <p style="margin:0;font-size:12px;color:#64748b;text-align:center;line-height:1.5;">
                      إذا لم تكن أنت من طلب إعادة تعيين كلمة المرور، يرجى تجاهل هذه الرسالة فحسابك وبياناتك في أمان تام دون أي تغيير.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;background-color:#121620;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                    <p style="margin:0;font-size:11px;color:#64748b;">
                      رسالة أمان تلقائية من SoSo AI • جميع الحقوق محفوظة © 2026
                    </p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """

            msg_alt.attach(MIMEText(text_plain, "plain", "utf-8"))
            msg_alt.attach(MIMEText(html_content, "html", "utf-8"))
            _attach_logo_if_exists(msg)

            if smtp_port == 465:
                with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=12) as server:
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)
            else:
                with smtplib.SMTP(smtp_host, smtp_port, timeout=12) as server:
                    server.ehlo()
                    server.starttls()
                    server.ehlo()
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)

            print(f"[AUTH] Successfully sent password reset email to {to_email}")
            return True
        except Exception as e:
            print(f"[AUTH] Failed to send password reset email to {to_email}: {e}")
            return False

    def _send_welcome_email(self, to_email: str, user_name: str) -> bool:
        settings = load_settings()
        smtp_host = os.getenv("SMTP_HOST", "") or settings.get("smtp_host", "")
        smtp_port = int(os.getenv("SMTP_PORT", 0) or settings.get("smtp_port", 587) or 587)
        smtp_user = os.getenv("SMTP_USER", "") or settings.get("smtp_user", "")
        smtp_pass = os.getenv("SMTP_PASSWORD", "") or settings.get("smtp_password", "")
        smtp_from = os.getenv("SMTP_FROM", "") or settings.get("smtp_from", "") or smtp_user or "noreply@soso-ai.app"

        if not smtp_host or not smtp_user or not smtp_pass:
            print(f"[AUTH] SMTP not configured. Welcome email skipped for {to_email}.")
            return False

        sender_name = "SoSo AI"
        sender_email = smtp_from

        try:
            msg = MIMEMultipart("related")
            msg_alt = MIMEMultipart("alternative")
            msg.attach(msg_alt)

            msg["Subject"] = "مرحباً بك في SoSo AI! 🚀 ميزات وامتيازات حسابك الجديد"
            msg["From"] = f'"{sender_name}" <{sender_email}>'
            msg["To"] = to_email
            msg["Reply-To"] = sender_email

            text_plain = f"""مرحباً بك، {user_name}! 👋

يسعدنا انضمامك إلى مجتمع SoSo AI - رفيقك الذكي اليومي للمحادثات، والإبداع، وحل المسائل المعقدة.
تم تفعيل حسابك بنجاح، وأصبح بإمكانك الآن الاستفادة من كافة الامتيازات التالية:

🌟 امتيازات وميزات حسابك في SoSo AI:
1. محادثات ذكية فائقة وغير محدودة: تواصل مع أحدث نماذج الذكاء الاصطناعي (Gemini 3.5 Flash Lite و GPT-4o) للحصول على إجابات فورية ودقيقة وشاملة.
2. تحليل الصور والمستندات واستخراج النصوص (Vision & OCR): ارفع الصور والرسوم البيانية والمعادلات والوثائق لاستخراج النصوص وحلها وشرحها بدقة متناهية.
3. نمط التفكير والتحليل العميق (Deep Thinking): تفعيل نمط التفكير المنطقي خطوة بخطوة للتعامل مع المسائل الرياضية، والبرمجية، والبحوث العلمية المعقدة.
4. إدخال واستماع صوتي تفاعلي: تحدث بصوتك الطبيعي بأي لغة أو لهجة مع التعرف الفوري والاستماع للردود الصوتية بوضوح.
5. مزامنة سحابية وحفظ مشفر لسجلاتك: جميع محادثاتك وسجلاتك محفوظة بأمان تام في حسابك الخاص وتزامن عبر كافة أجهزتك.
6. تخصيص كامل للواجهة والسمات: اختر ما يناسبك بين السمة الداكنة، والفاتحة، والخشبية الفاخرة مع التحكم في طابع وشخصية الذكاء الاصطناعي.

ابدأ الآن واستمتع بتجربة SoSo AI:
http://127.0.0.1:8000

فريق SoSo AI
"""

            html_content = f"""
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>مرحباً بك في SoSo AI</title>
            </head>
            <body style="margin:0;padding:20px;background-color:#0f1219;font-family:'Segoe UI',Tahoma,Arial,sans-serif;color:#ffffff;direction:rtl;text-align:right;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;margin:0 auto;background-color:#161b27;border:1px solid #2a3449;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.6);">
                <!-- Header with Logo -->
                <tr>
                  <td style="padding:32px 24px 24px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.08);background:linear-gradient(135deg, rgba(255,122,0,0.18), rgba(234,88,12,0.25));">
                    <img src="cid:soso_logo" width="68" height="68" alt="SoSo AI" style="display:block;margin:0 auto 12px;border-radius:18px;border:2px solid rgba(255,122,0,0.4);box-shadow:0 6px 20px rgba(255,122,0,0.35);">
                    <h1 style="margin:0 0 6px;font-size:26px;font-weight:800;color:#FF7A00;letter-spacing:-0.5px;">SoSo AI</h1>
                    <p style="margin:0;font-size:14px;color:#cbd5e1;">مساعدك الذكي ورفيقك المعرفي اليومي</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:28px 26px;">
                    <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#ffffff;">أهلاً وسهلاً بك، {user_name}! 🎉</h2>
                    <p style="margin:0 0 22px;font-size:14px;line-height:1.7;color:#cbd5e1;">
                      يسعدنا جداً انضمامك إلى منصة <strong>SoSo AI</strong>. تم تفعيل وتأكيد حسابك بنجاح، وأصبحت الآن جاهزاً لخوض تجربة ذكاء اصطناعي استثنائية متكاملة لإنجاز دراستك، أعمالك، ومشاريعك الإبداعية بكل سهولة.
                    </p>

                    <!-- Privileges Card -->
                    <div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,122,0,0.25);border-radius:16px;padding:22px 20px;margin-bottom:26px;">
                      <h3 style="margin:0 0 16px;font-size:16px;font-weight:800;color:#FFA74D;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:10px;">
                        🌟 أبرز ميزات وامتيازات حسابك الجديد:
                      </h3>
                      
                      <!-- Point 1 -->
                      <div style="margin-bottom:14px;display:flex;align-items:flex-start;">
                        <div style="font-size:18px;margin-left:10px;line-height:1.4;">💬</div>
                        <div>
                          <strong style="color:#ffffff;font-size:14px;">محادثات ذكية فائقة وغير محدودة</strong>
                          <p style="margin:2px 0 0;font-size:13px;line-height:1.5;color:#94a3b8;">تواصل بحرية مع نماذج Gemini 3.5 Flash Lite و GPT-4o للحصول على إجابات تحليلية فورية وشاملة لأي سؤال أو فكرة.</p>
                        </div>
                      </div>

                      <!-- Point 2 -->
                      <div style="margin-bottom:14px;display:flex;align-items:flex-start;">
                        <div style="font-size:18px;margin-left:10px;line-height:1.4;">👁️</div>
                        <div>
                          <strong style="color:#ffffff;font-size:14px;">تحليل الصور والمستندات واستخراج النصوص (Vision & OCR)</strong>
                          <p style="margin:2px 0 0;font-size:13px;line-height:1.5;color:#94a3b8;">ارفع أي صورة، مستند، رسم بياني، أو معادلة رياضية وسيقوم SoSo AI باستخراج النصوص وتحليلها وتقديم الشرح الدقيق.</p>
                        </div>
                      </div>

                      <!-- Point 3 -->
                      <div style="margin-bottom:14px;display:flex;align-items:flex-start;">
                        <div style="font-size:18px;margin-left:10px;line-height:1.4;">🧠</div>
                        <div>
                          <strong style="color:#ffffff;font-size:14px;">نمط التفكير والتحليل العميق (Deep Thinking)</strong>
                          <p style="margin:2px 0 0;font-size:13px;line-height:1.5;color:#94a3b8;">تفعيل زر التفكير المنطقي العميق للمسائل الرياضية والفيزيائية المعقدة، والبرمجة المتقدمة، والاستنتاج خطوة بخطوة.</p>
                        </div>
                      </div>

                      <!-- Point 4 -->
                      <div style="margin-bottom:14px;display:flex;align-items:flex-start;">
                        <div style="font-size:18px;margin-left:10px;line-height:1.4;">🎙️</div>
                        <div>
                          <strong style="color:#ffffff;font-size:14px;">إدخال واستماع صوتي تفاعلي ذكي</strong>
                          <p style="margin:2px 0 0;font-size:13px;line-height:1.5;color:#94a3b8;">تحدث مع SoSo AI بصوتك الطبيعي بمختلف اللهجات واللغات مع الرد الصوتي المباشر والواضح.</p>
                        </div>
                      </div>

                      <!-- Point 5 -->
                      <div style="margin-bottom:14px;display:flex;align-items:flex-start;">
                        <div style="font-size:18px;margin-left:10px;line-height:1.4;">☁️</div>
                        <div>
                          <strong style="color:#ffffff;font-size:14px;">مزامنة سحابية وحفظ مشفر لسجلاتك</strong>
                          <p style="margin:2px 0 0;font-size:13px;line-height:1.5;color:#94a3b8;">كافة محادثاتك وسجلاتك محفوظة بأمان تام ومشفرة بحسابك الشخصي، ويمكنك استئنافها من أي جهاز في أي وقت.</p>
                        </div>
                      </div>

                      <!-- Point 6 -->
                      <div style="display:flex;align-items:flex-start;">
                        <div style="font-size:18px;margin-left:10px;line-height:1.4;">🎨</div>
                        <div>
                          <strong style="color:#ffffff;font-size:14px;">تخصيص كامل للشخصية والسمات</strong>
                          <p style="margin:2px 0 0;font-size:13px;line-height:1.5;color:#94a3b8;">اختر بين المظهر الداكن، الفاتح، والخشبي الكلاسيكي، مع إمكانية تعديل طابع وشخصية الذكاء الاصطناعي ودرجة إبداعه.</p>
                        </div>
                      </div>
                    </div>

                    <!-- Call To Action Button -->
                    <div style="text-align:center;margin:28px 0 10px;">
                      <a href="http://127.0.0.1:8000" style="display:inline-block;padding:14px 34px;background:linear-gradient(135deg, #FF7A00 0%, #EA580C 100%);color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;border-radius:14px;box-shadow:0 4px 18px rgba(255,122,0,0.45);">
                        🚀 ابدأ محادثتك الأولى الآن
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:18px 24px;background-color:#121620;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                    <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;">
                      إذا كان لديك أي سؤال أو استفسار، فريق الدعم دائماً في خدمتك.
                    </p>
                    <p style="margin:0;font-size:11px;color:#64748b;">
                      تم إرسال هذا البريد تلقائياً لأنك قمت بإنشاء حساب في SoSo AI • جميع الحقوق محفوظة © 2026
                    </p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """

            msg_alt.attach(MIMEText(text_plain, "plain", "utf-8"))
            msg_alt.attach(MIMEText(html_content, "html", "utf-8"))
            _attach_logo_if_exists(msg)

            if smtp_port == 465:
                with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=12) as server:
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)
            else:
                with smtplib.SMTP(smtp_host, smtp_port, timeout=12) as server:
                    server.ehlo()
                    server.starttls()
                    server.ehlo()
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)

            print(f"[AUTH] Successfully sent welcome email to {to_email}")
            return True
        except Exception as e:
            print(f"[AUTH] Failed to send welcome email to {to_email}: {e}")
            return False

auth_service = AuthService()
