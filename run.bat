@echo off
title SoSo AI - رفيقك الذكي اليومي
chcp 65001 > nul
echo ========================================================
echo ✨ تشغيل تطبيق SoSo AI (الرفيق الذكي اليومي) ✨
echo ========================================================
echo.

cd /d "%~dp0"

if exist ".venv\Scripts\python.exe" (
    echo جاري تشغيل الخادم والواجهة عبر البيئة الافتراضية...
    ".venv\Scripts\python.exe" run.py
) else (
    echo لم يتم العثور على البيئة الافتراضية، جاري التشغيل عبر بايثون الرئيسي...
    python run.py
)

pause
