from fastapi import APIRouter
from app import schemas

router = APIRouter()


@router.post("/flashcards")
def create_flashcards(data: schemas.FlashcardRequest):
    
    return {
        "topic": data.topic,
        "flashcards": [
            {"q": "What is FastAPI?", "a": "A Python web framework for APIs"},
            {"q": "What is React?", "a": "A JS library for building UIs"}
        ]
    }

@router.get("/ping")
def ping():
    return {"message": "pong 🏓"}

# Example route: generate notes
@router.post("/notes")
def generate_notes(data: schemas.NotesRequest):
    return {
        "topic": data.topic,
        "notes": f"These are some auto-generated notes about {data.topic}"
    }
