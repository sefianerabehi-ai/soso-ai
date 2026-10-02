import sys
import time
import webbrowser
import threading
from pathlib import Path
import uvicorn

# Project root
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

def open_browser():
    time.sleep(1.2)
    print("\n🌐 فتح التطبيق في المتصفح: http://localhost:8000")
    webbrowser.open("http://localhost:8000")

if __name__ == "__main__":
    print("=" * 60)
    print("✨ بدء تشغيل تطبيق SoSo AI - رفيقك الذكي اليومي ✨")
    print("=" * 60)
    
    # Launch browser thread
    threading.Thread(target=open_browser, daemon=True).start()
    
    # Run FastAPI app
    uvicorn.run(
        "backend.main:app",
        host="127.0.0.1",
        port=8000,
        reload=False,
        log_level="info"
    )
