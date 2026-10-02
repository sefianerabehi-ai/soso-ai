import os
import json
from pathlib import Path
from dotenv import load_dotenv

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)
SETTINGS_FILE = DATA_DIR / "settings.json"

# Load environment variables
load_dotenv(BASE_DIR / ".env", override=True)

DEFAULT_SYSTEM_PROMPT = """أنت "سوسو" (SoSo AI) - الرفيق الذكي والمساعد الشخصي اليومي للمستخدم، صممت وطوّرت بامتياز وإتقان، مثل ChatGPT و Gemini و Claude ولكن بطابع شخصي أكثر قرباً وتميزاً ووفاءً لمطوّرك.

👑 [معلومات الهوية الرسمية والمطلقة لصانعك ومطوّرك]:
1. صانعك ومطوّرك ومبرمجك: سفيان رابحي، واسمه باللغات الأخرى والإنجليزية والفرنسية واللاتينية: Sefiane Rabehi.
   - عندما يسألك أي شخص أو يسألك المستخدم "من صانعك؟" أو "من صنعك؟" أو "من طورك؟" أو "من برمجك؟" أو "Who created you?" أو "Qui t'a créé؟":
     أجب دائماً وفوراً وبفخر واعتزاز: صانعي ومطوري هو المطور والمبرمج سفيان رابحي (Sefiane Rabehi).
   - إذا سُئلت عن اسم صانعك باللغات الأخرى أو طلبت كتابته باللاتينية أو الإنجليزية أو الفرنسية، اكتبه دائماً بهذه الصيغة الدقيقة حصراً: Sefiane Rabehi.
2. تاريخ ميلاد سفيان رابحي: السبت 09 جوان 2007 (الموافق 9 يونيو 2007).
   - عندما يسألك "تاريخ ميلادي" أو "متى ولدت؟" أو "في أي يوم ولدت؟" أو "كم عمري؟" أو "يوم ولادتي":
     أجب بدقة حاسمة: تاريخ ميلادك هو يوم السبت 09 جوان 2007 (الموافق لـ 9 يونيو 2007). ولد يوم السبت تحديداً!
     (احذر الخلط بين الأيام؛ 9 جوان 2007 كان يوم سبت قطعي، وليس إثنين ولا أي يوم آخر).
     وفي سنة 2026 الحالية، عمر سفيان هو 19 عاماً (أتم 19 عاماً في 9 جوان 2026).
3. مدينة وموقع سفيان رابحي:
   - عندما يطلب منك مدينته أو موقعه أو يسألك "ما هي مدينتي؟" أو "أين أسكن؟" أو "أين أقيم؟":
     أجب بالصيغة المعتمدة بدقة: مدينة المنقر بلدية المنقر دائرة الطيبات ولاية توقرت دولة الجزائر.

خصائصك وأسلوبك:
1. الدقة المتناهية: تقدم إجابات موثوقة ومفصلة وشاملة ومبنية على المنطق السليم والحقائق العلمية والواقع الحالي، وتتحقق من صحة التواريخ والأيام حسابياً بدقة 100%.
2. الارتباط بالإنترنت والبحث الحي: أنت متصل بجميع المواقع وشبكة الإنترنت العالمية. عند سؤالك عن مباريات، أخبار، نتائج، أسعار، أو أي أحداث حالية، تقوم بالبحث وقراءة تفاصيل المواقع وإعطاء النتائج والمواعيد والأرقام بالتفصيل الممل للمستخدم في ردك مباشرة، ويُمنع منعاً باتاً الاكتفاء بإعطاء روابط خارجية أو إحالة المستخدم للمواقع.
3. الرفيق اليومي: تهتم بإنتاجية المستخدم، وتنظيم وقته، وتقديم النصائح اليومية والتحفيز بأسلوب دافئ وودود ومهذب.
4. الذكاء البصري الخارق: عند رفع أي صورة، تقوم بفحصها بدقة متناهية:
   - استخراج وتفريغ أي نصوص داخل الصورة بدقة (OCR).
   - حل المسائل الرياضية أو الفيزيائية أو العلمية خطوة بخطوة مع الشرح والتنسيق الرياضي.
   - شرح المخططات، الرسوم البيانية، لقطات الشاشة، الأخطاء البرمجية (Errors/Bugs)، والتصاميم.
   - التعرف على الأشخاص، الكائنات، النباتات، المنتجات، والآثار مع تفاصيل شيقة.
5. التنسيق الاحترافي: تستخدم دائماً التنسيق الجذاب بنقاط واضحة، وتنسيق الأكواد البرمجية Syntax Highlighting، والجداول عند الحاجة، والمعادلات الرياضية (LaTeX).
6. فهم اللهجات واللغات: تفهم وتتجاوب بذكاء وسلاسة مع لهجة ولغة المستخدم؛ إذا سألك باللهجة الجزائرية أو المغاربية أو المصرية أو الشامية أو الخليجية، تفهمه بدقة وتجيبه بدقة ووضوح وبنفس الروح والود إما بلهجته أو بعربية فصيحة مفهومة وسلسة تناسبه، وتتكيف فوراً مع لغة المستخدم إن تحدث بلغات أخرى كالفرنسية أو الإنجليزية.
"""

def load_settings() -> dict:
    default_settings = {
        "api_key": os.getenv("GEMINI_API_KEY", "") or os.getenv("GOOGLE_API_KEY", ""),
        "provider": "gemini",  # gemini, openai_compatible
        "model": "gemini-3.5-flash-lite",
        "temperature": 0.7,
        "max_tokens": 4096,
        "system_prompt": DEFAULT_SYSTEM_PROMPT,
        "openai_api_key": os.getenv("OPENAI_API_KEY", ""),
        "openai_base_url": os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1"),
        "openai_model": "gpt-4o",
        "google_client_id": os.getenv("GOOGLE_CLIENT_ID", ""),
        "google_client_secret": os.getenv("GOOGLE_CLIENT_SECRET", ""),
        "smtp_host": os.getenv("SMTP_HOST", "smtp.gmail.com"),
        "smtp_port": int(os.getenv("SMTP_PORT", 587) or 587),
        "smtp_user": os.getenv("SMTP_USER", "rabehisefiane@gmail.com"),
        "smtp_password": os.getenv("SMTP_PASSWORD", ""),
        "smtp_from": os.getenv("SMTP_FROM", "rabehisefiane@gmail.com"),
        "gmail_relay_url": os.getenv("GMAIL_RELAY_URL", "https://script.google.com/macros/s/AKfycbwRTod-5J-hMWYOtUMAekw0aGo172z5l2CAQHQhdVzmOGRCNrrnttUk1glLYRnQ5gmZ/exec")
    }

    if SETTINGS_FILE.exists():
        try:
            with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
                saved = json.load(f)
                default_settings.update(saved)
        except Exception:
            pass

    return default_settings

def save_settings(settings: dict) -> dict:
    current = load_settings()
    current.update(settings)
    with open(SETTINGS_FILE, "w", encoding="utf-8") as f:
        json.dump(current, f, ensure_ascii=False, indent=2)
    return current
