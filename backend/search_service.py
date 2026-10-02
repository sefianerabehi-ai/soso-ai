import re
import html
import asyncio
import urllib.parse
from datetime import datetime
from typing import List, Dict, Optional, Any
import httpx

def clean_html(text: str) -> str:
    if not text:
        return ""
    # Remove script, style, svg, noscript, nav, footer, header, aside, iframe tags
    text = re.sub(r'<(script|style|svg|noscript|nav|footer|header|aside|iframe)[^>]*>[\s\S]*?</\1>', '', text, flags=re.IGNORECASE)
    # Remove HTML comments
    text = re.sub(r'<!--[\s\S]*?-->', '', text)
    # Replace block/table elements with newlines to preserve structure
    text = re.sub(r'<(br|p|div|tr|li|h[1-6])[^>]*>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</(p|div|tr|li|h[1-6])>', '\n', text, flags=re.IGNORECASE)
    # Strip all remaining tags
    text = re.sub(r'<[^>]+>', ' ', text)
    text = html.unescape(text)
    # Normalize lines
    lines = [re.sub(r'[ \t]+', ' ', line).strip() for line in text.split('\n')]
    lines = [line for line in lines if line]
    return '\n'.join(lines)

def get_temporal_context(
    client_timestamp: Optional[str] = None,
    client_timezone: Optional[str] = None,
    client_time_str: Optional[str] = None
) -> str:
    """
    Generate authoritative, second-accurate real-time temporal anchor directive.
    """
    now = datetime.now()
    days_ar = {
        0: "الإثنين",
        1: "الثلاثاء",
        2: "الأربعاء",
        3: "الخميس",
        4: "الجمعة",
        5: "السبت",
        6: "الأحد"
    }
    months_ar = {
        1: "يناير (كانون الثاني)",
        2: "فبراير (شباط)",
        3: "مارس (آذار)",
        4: "أبريل (نيسان)",
        5: "مايو (أيار)",
        6: "يونيو (حزيران)",
        7: "يوليو (تموز)",
        8: "أغسطس (آب)",
        9: "سبتمبر (أيلول)",
        10: "أكتوبر (تشرين الأول)",
        11: "نوفمبر (تشرين الثاني)",
        12: "ديسمبر (كانون الأول)"
    }
    
    day_name_ar = days_ar.get(now.weekday(), "")
    day_name_en = now.strftime("%A")
    month_name_ar = months_ar.get(now.month, "")
    
    period_ar = "صباحاً" if now.hour < 12 else "مساءً"
    hour_12 = now.hour % 12 or 12
    time_ar = f"{hour_12:02d}:{now.minute:02d}:{now.second:02d} {period_ar}"
    time_str = now.strftime("%I:%M:%S %p")
    
    full_date_ar = f"{day_name_ar}، {now.day} {month_name_ar} {now.year}م"
    full_date_en = now.strftime("%A, %B %d, %Y - %H:%M:%S")
    
    tz = client_timezone or "المحلي للجهاز"
    client_custom = f"\n• توقيت متصفح المستخدم المباشر: {client_time_str}" if client_time_str else ""

    return f"""
═══════════════════════════════════════════════════════════════════════
⏰ [ساعة الواقع الفعلي الحي بالثانية - REAL-TIME CLOCK & TEMPORAL CONTEXT]
• اليوم الحالي: {day_name_ar} ({day_name_en})
• التاريخ الكامل: {full_date_ar}
• الوقت الحالي بالثانية بدقة متناهية: {time_ar} ({time_str})
• السنة الحالية في العالم الواقعي: {now.year}م
• المنطقة الزمنية: {tz}{client_custom}

⚠️ تنبيه إلزامي صارم لتفادي الأخطاء الزمنية:
1. عند سؤالك عن "تاريخ اليوم" أو "كم اليوم" أو "الوقت الآن بالثانية" أو "في أي سنة نحن" أو أي حسابات تاريخية، أجب فوراً بدقة متناهية استناداً إلى هذه البيانات الحية أعلاه.
2. السنة الحالية هي {now.year}، وممنوع نهائياً الخلط بينها وبين سنوات سابقة (مثل 2024 أو 2025). أنت تعيش وتتحدث في هذه اللحظة من سنة {now.year}!
═══════════════════════════════════════════════════════════════════════
"""

def calculate_day_of_week_from_query(query: str) -> Optional[str]:
    """
    Detect explicit or implicit date references in query, compute the exact mathematical
    day of the week (using Gregorian calendar), and return an authoritative grounding string.
    """
    if not query:
        return None
    lower_q = query.lower()

    # 1. Creator birthdate questions
    if any(phrase in lower_q for phrase in ["في اي يوم ولدت", "في أي يوم ولدت", "يوم ولادتي", "يوم ميلادي", "تاريخ ميلادي"]):
        return "📅 [حقيقة تقويمية مؤكدة قطعية]: صانعك ومطورك هو سفيان رابحي (Sefiane Rabehi). تاريخ ميلاده هو يوم السبت 09 جوان 2007 (الموافق 9 يونيو 2007). ولد يوم السبت حصراً!"

    # 2. Months mapping (supports North African/Algerian, Middle Eastern, and English month names)
    months_map = {
        "جانفي": 1, "يناير": 1, "january": 1,
        "فيفري": 2, "فبراير": 2, "february": 2,
        "مارس": 3, "march": 3,
        "أفريل": 4, "ابريل": 4, "إبريل": 4, "april": 4,
        "ماي": 5, "مايو": 5, "may": 5,
        "جوان": 6, "يونيو": 6, "يونية": 6, "june": 6,
        "جويلية": 7, "يوليو": 7, "يولية": 7, "july": 7,
        "أوت": 8, "اوت": 8, "أغسطس": 8, "اغسطس": 8, "august": 8,
        "سبتمبر": 9, "september": 9,
        "أكتوبر": 10, "اكتوبر": 10, "october": 10,
        "نوفمبر": 11, "november": 11,
        "ديسمبر": 12, "december": 12
    }
    days_ar = {
        0: "الإثنين",
        1: "الثلاثاء",
        2: "الأربعاء",
        3: "الخميس",
        4: "الجمعة",
        5: "السبت",
        6: "الأحد"
    }

    # Match: day month year (e.g. 9 جوان 2007, 09 يونيو 2007)
    pattern1 = r'(\d{1,2})\s+([أ-يa-zA-Z]+)\s+(\d{4})'
    m1 = re.search(pattern1, lower_q)
    if m1:
        d = int(m1.group(1))
        m_name = m1.group(2)
        y = int(m1.group(3))
        m_num = months_map.get(m_name)
        if m_num and 1 <= d <= 31 and 1900 <= y <= 2100:
            try:
                dt = datetime(y, m_num, d)
                day_name = days_ar.get(dt.weekday())
                return f"📅 [حساب تقويمي رياضي دقيق 100% قطعي]: تاريخ {d} {m_name} {y} يوافق قطعاً يوم {day_name}."
            except Exception:
                pass

    # Match ISO: YYYY-MM-DD
    pattern2 = r'(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})'
    m2 = re.search(pattern2, lower_q)
    if m2:
        y, m, d = int(m2.group(1)), int(m2.group(2)), int(m2.group(3))
        if 1 <= m <= 12 and 1 <= d <= 31 and 1900 <= y <= 2100:
            try:
                dt = datetime(y, m, d)
                day_name = days_ar.get(dt.weekday())
                return f"📅 [حساب تقويمي رياضي دقيق 100% قطعي]: تاريخ {y}-{m:02d}-{d:02d} يوافق قطعاً يوم {day_name}."
            except Exception:
                pass

    # Match DD/MM/YYYY
    pattern3 = r'(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})'
    m3 = re.search(pattern3, lower_q)
    if m3:
        d, m, y = int(m3.group(1)), int(m3.group(2)), int(m3.group(3))
        if 1 <= m <= 12 and 1 <= d <= 31 and 1900 <= y <= 2100:
            try:
                dt = datetime(y, m, d)
                day_name = days_ar.get(dt.weekday())
                return f"📅 [حساب تقويمي رياضي دقيق 100% قطعي]: تاريخ {d:02d}/{m:02d}/{y} يوافق قطعاً يوم {day_name}."
            except Exception:
                pass

    return None

SEARCH_KEYWORDS = [
    # Sport, football, matches & tournaments
    "مباراة", "مباريات", "نتيجة", "نتائج", "ترتيب", "دوري", "كأس", "بطولة", "أمم", "الامم",
    "الأمم الأوروبية", "الامم الاوروبية", "دوري الأبطال", "دوري ابطال", "تشامبيونزليغ", "كأس العالم",
    "من فاز", "فاز", "خسر", "أهداف", "هدف", "هداف", "مواجهات", "مواجهة", "جدول", "مواعيد", "موعد",
    "ميسي", "رونالدو", "ريال مدريد", "برشلونة", "مانشستر", "ليفربول", "بايرن", "باريس",
    "الهلال", "النصر", "الأهلي", "الاتحاد", "المنتخب الجزائري", "منتخب الجزائر",
    # Temporal & real-time
    "اليوم", "أمس", "البارحة", "الآن", "هذا الأسبوع", "هذا الشهر", "الليلة", "غداً", "غدا",
    "سنة 2026", "2026", "2027",
    # News, prices & economy
    "أحدث", "احدث", "آخر", "اخر", "أخبار", "اخبار", "جديد", "سعر", "أسعار", "اسعار",
    "عملة", "عملات", "بيتكوين", "دولار", "يورو", "دينار", "ذهب", "نفط",
    # Politics, world events, facts
    "من هو رئيس", "من هو مدرب", "من هو وزير", "من هو ملك", "رئيس وزراء", "حكومة", "انتخابات",
    "زلزال", "طقس", "درجة الحرارة", "كم عمر", "كم ثروة", "كم عدد", "من فاز بـ", "أين يلعب", "انتقال",
    # Search intents
    "ابحث", "بحث", "جوجل", "انترنت", "مواقع", "نتائج البحث", "موقع", "خبر",
    "news", "latest", "recent", "current", "score", "match", "stats", "today", "fixtures"
]

NON_SEARCH_PREFIXES = [
    "ارسم", "انشئ صورة", "أنشئ صورة", "صمم صورة", "توليد صورة", "رسم صورة", "/image",
    "اكتب كود", "برمج", "صحح الكود", "اشرح لي كود", "ترجم النص", "لخص هذا"
]

def should_search_web(query: str) -> bool:
    """
    Determine if the query asks about current events, scores, matches, fresh facts, or real-time web information.
    """
    clean = query.strip().lower()
    if not clean or len(clean) < 3:
        return False

    # Don't search if it's asking specifically about creator identity or personal profile
    creator_exclusions = [
        "صانعك", "مطورك", "مبرمجك", "مصممك", "من صنعك", "من صانعك", "من طورك", "من برمجك",
        "سفيان", "sefiane", "rabehi", "rabhi", "تاريخ ميلادي", "في اي يوم ولدت",
        "يوم ولادتي", "يوم ميلادي", "مدينتي", "بلديتي", "ولايتي", "اين اسكن", "أين أسكن", "أين أقيم"
    ]
    if any(p in clean for p in creator_exclusions):
        return False

    # Don't search if it's purely image generation
    for nsp in NON_SEARCH_PREFIXES:
        if clean.startswith(nsp):
            return False

    # Check for search triggers
    for kw in SEARCH_KEYWORDS:
        if kw in clean:
            return True

    return False

async def fetch_page_content(url: str, client: httpx.AsyncClient, max_chars: int = 5000) -> str:
    """
    Asynchronously scrape and clean web page content.
    """
    try:
        if not url or not url.startswith("http"):
            return ""
        lower_u = url.lower()
        if any(lower_u.endswith(ext) for ext in [".pdf", ".jpg", ".png", ".mp4", ".mp3", ".zip", ".rar", ".exe", ".webp"]):
            return ""

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "ar,en-US;q=0.9,en;q=0.8"
        }
        res = await client.get(url, headers=headers, timeout=6.0, follow_redirects=True)
        if res.status_code == 200:
            cleaned = clean_html(res.text)
            return cleaned[:max_chars]
    except Exception:
        pass
    return ""

async def search_web(query: str, max_results: int = 5, fetch_deep_content: bool = True) -> List[Dict[str, str]]:
    """
    Asynchronously search DuckDuckGo HTML for fresh web data and deeply scrape the top pages.
    """
    url = "https://html.duckduckgo.com/html/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Referer": "https://html.duckduckgo.com/"
    }
    data = {"q": query}

    try:
        async with httpx.AsyncClient(timeout=8.0, follow_redirects=True) as client:
            res = await client.post(url, data=data, headers=headers)
            if res.status_code != 200:
                return []

            titles = re.findall(r'<a[^>]+class=[\'"]result__a[\'"][^>]*href=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</a>', res.text, re.DOTALL)
            snippets = re.findall(r'<a[^>]+class=[\'"]result__snippet[\'"][^>]*href=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</a>', res.text, re.DOTALL)

            results = []
            for i in range(min(len(titles), len(snippets), max_results)):
                title_text = clean_html(titles[i][1])
                snippet_text = clean_html(snippets[i][1])
                link = titles[i][0]

                if "uddg=" in link:
                    try:
                        parsed = urllib.parse.urlparse(link)
                        params = urllib.parse.parse_qs(parsed.query)
                        if "uddg" in params:
                            link = params["uddg"][0]
                    except Exception:
                        pass

                results.append({
                    "title": title_text,
                    "url": link,
                    "snippet": snippet_text,
                    "page_content": ""
                })

            # Fetch deep contents of the top 3 pages in parallel
            if fetch_deep_content and results:
                fetch_tasks = [
                    fetch_page_content(r["url"], client, max_chars=4500)
                    for r in results[:3]
                ]
                pages_data = await asyncio.gather(*fetch_tasks, return_exceptions=True)
                for idx, page in enumerate(pages_data):
                    if isinstance(page, str) and len(page) > 50:
                        results[idx]["page_content"] = page

            return results
    except Exception as e:
        print(f"Web search error for '{query}': {e}")
        return []

def format_search_results_for_prompt(query: str, results: List[Dict[str, str]]) -> str:
    """
    Format search results and deeply extracted webpage content into an authoritative block for the LLM.
    """
    if not results:
        return ""

    lines = [
        "═══════════════════════════════════════════════════════════════════════",
        "🌐 [بيانات التصفح الحي المباشر لشبكة الإنترنت والمواقع الإلكترونية - LIVE WEB DATA]",
        f"• استعلام وسؤال المستخدم المباشر: \"{query}\"",
        "• تم تصفح واستخراج المحتويات والبيانات الحية التالية للتو من كبرى المواقع العالمية:",
        ""
    ]
    for idx, r in enumerate(results, 1):
        lines.append(f"📌 المصدر #{idx}: {r['title']}")
        if r.get('url'):
            lines.append(f"   الرابط: {r['url']}")
        if r.get('snippet'):
            lines.append(f"   المقتطف الأولي: {r['snippet']}")
        if r.get('page_content'):
            lines.append("   📄 تفاصيل ومحتوى الصفحة المستخرج حياً من الموقع:")
            # Indent each line
            page_excerpt = r['page_content'][:4000].replace('\n', '\n   | ')
            lines.append(f"   | {page_excerpt}")
        lines.append("")

    lines.extend([
        "⚠️ تعليمات إلزامية قطعية وصارمة جداً للمساعد (ممنوع مخالفتها نهائياً):",
        "1. أنت الآن متصل بمواقع الإنترنت مباشرة ولديك البيانات الحقيقية والكاملة المستخرجة للتو من الويب.",
        "2. يُمنع منعاً باتاً ومطلقاً أن تطلب من المستخدم زيارة روابط أو تقول له 'يمكنك مراجعة المواقع' أو 'تابع عبر الروابط' أو 'اضغط هنا'! المستخدم يسألك أنت لتعطيه التفاصيل بنفسك.",
        "3. استخرج واذكر كل التفاصيل، المواعيد، الفرق المتبارية، النتائج، الأهداف، القنوات، والجداول كاملة وبأعلى درجات الدقة والتفصيل والوضوح في ردك مباشرة منسقة في جداول أو نقاط جذابة.",
        "4. إذا كان السؤال عن مباريات اليوم، اذكر مباريات اليوم بالتفصيل (اسم الفريقين، التوقيت، البطولة)، وإذا كانت هناك مباريات أقيمت بالأمس أو مباريات قادمة اذكرها للمستخدم بدقة ووضوح.",
        "5. قدم إجابة مفصلة وغنية وشاملة تشفي غليل المستخدم وتوضح كافة الجوانب بالأسماء والأرقام الحقيقية.",
        "═══════════════════════════════════════════════════════════════════════"
    ])
    return "\n".join(lines)
