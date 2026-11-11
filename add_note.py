import json
from datetime import date
from pathlib import Path

NOTES_FILE = Path("lab_notes.json")

def main():
    print("--- 📝 New Lab Note ---")
    category = input("Category (e.g., Python/Data, Stats, Algorithmic): ").strip()
    content = input("Content (1-2 sentences): ").strip()
    snippet = input("Code snippet or metric (optional, press Enter to skip): ").strip()

    # Load existing notes
    notes = []
    if NOTES_FILE.exists():
        notes = json.loads(NOTES_FILE.read_text())

    # Generate new ID and entry
    new_id = f"note-{len(notes) + 1:03d}"
    new_entry = {
        "id": new_id,
        "date": str(date.today()),
        "category": category or "General",
        "content": content,
        "snippet": snippet if snippet else None
    }

    # Prepend so newest is first
    notes.insert(0, new_entry)
    NOTES_FILE.write_text(json.dumps(notes, indent=2))
    print(f"✅ Added note {new_id} to {NOTES_FILE}!")

if __name__ == "__main__":
    main()