import json
import uuid
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional, Any

from .config import DATA_DIR

CONVERSATIONS_FILE = DATA_DIR / "conversations.json"
UPLOADS_DIR = DATA_DIR / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

class Storage:
    def __init__(self):
        self._ensure_file()

    def _ensure_file(self):
        if not CONVERSATIONS_FILE.exists():
            with open(CONVERSATIONS_FILE, "w", encoding="utf-8") as f:
                json.dump([], f, ensure_ascii=False, indent=2)

    def _read_all(self) -> List[Dict[str, Any]]:
        self._ensure_file()
        try:
            with open(CONVERSATIONS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []

    def _write_all(self, data: List[Dict[str, Any]]):
        with open(CONVERSATIONS_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def list_conversations(self, user_id: Optional[str] = None) -> List[Dict[str, Any]]:
        convs = self._read_all()
        # If user_id is provided, only return conversations belonging to this user
        if user_id:
            convs = [c for c in convs if c.get("user_id") == user_id]
        else:
            # Unauthenticated or guest: only conversations with no user_id
            convs = [c for c in convs if not c.get("user_id")]

        # Sort by updated_at descending
        convs.sort(key=lambda c: c.get("updated_at", ""), reverse=True)
        return [
            {
                "id": c["id"],
                "title": c.get("title", "محادثة جديدة"),
                "created_at": c.get("created_at"),
                "updated_at": c.get("updated_at"),
                "message_count": len(c.get("messages", [])),
                "user_id": c.get("user_id")
            }
            for c in convs
        ]

    def get_conversation(self, conv_id: str, user_id: Optional[str] = None) -> Optional[Dict[str, Any]]:
        convs = self._read_all()
        for c in convs:
            if c["id"] == conv_id:
                if user_id and c.get("user_id") and c.get("user_id") != user_id:
                    return None
                return c
        return None

    def create_conversation(self, title: str = "محادثة جديدة", user_id: Optional[str] = None) -> Dict[str, Any]:
        convs = self._read_all()
        now = datetime.now().isoformat()
        new_conv = {
            "id": str(uuid.uuid4()),
            "title": title,
            "user_id": user_id,
            "created_at": now,
            "updated_at": now,
            "messages": []
        }
        convs.insert(0, new_conv)
        self._write_all(convs)
        return new_conv

    def add_message(
        self,
        conv_id: str,
        role: str,
        content: str,
        image_url: Optional[str] = None,
        deep_think: bool = False,
        user_id: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        convs = self._read_all()
        now = datetime.now().isoformat()
        target = None
        for c in convs:
            if c["id"] == conv_id:
                target = c
                break

        if not target:
            target = {
                "id": conv_id,
                "title": content[:30] if content else "محادثة جديدة",
                "user_id": user_id,
                "created_at": now,
                "updated_at": now,
                "messages": []
            }
            convs.insert(0, target)
        else:
            if user_id and not target.get("user_id"):
                target["user_id"] = user_id

        msg_obj = {
            "id": str(uuid.uuid4()),
            "role": role,
            "content": content,
            "image_url": image_url,
            "deep_think": deep_think,
            "timestamp": now
        }
        target["messages"].append(msg_obj)
        target["updated_at"] = now

        # Update title if it's the first user message
        if len(target["messages"]) == 1 and role == "user":
            cleaned = content.strip().split("\n")[0][:40]
            if cleaned:
                target["title"] = cleaned

        self._write_all(convs)
        return msg_obj

    def delete_conversation(self, conv_id: str, user_id: Optional[str] = None) -> bool:
        convs = self._read_all()
        filtered = []
        deleted = False
        for c in convs:
            if c["id"] == conv_id:
                if user_id and c.get("user_id") and c.get("user_id") != user_id:
                    filtered.append(c)
                else:
                    deleted = True
            else:
                filtered.append(c)

        if deleted:
            self._write_all(filtered)
            return True
        return False

    def update_title(self, conv_id: str, title: str, user_id: Optional[str] = None) -> bool:
        convs = self._read_all()
        for c in convs:
            if c["id"] == conv_id:
                if user_id and c.get("user_id") and c.get("user_id") != user_id:
                    return False
                c["title"] = title
                c["updated_at"] = datetime.now().isoformat()
                self._write_all(convs)
                return True
        return False

    def clear_all(self, user_id: Optional[str] = None):
        if not user_id:
            self._write_all([])
        else:
            convs = self._read_all()
            filtered = [c for c in convs if c.get("user_id") != user_id]
            self._write_all(filtered)

storage = Storage()
