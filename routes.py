from fastapi import APIRouter, HTTPException
from app import schemas, models

router = APIRouter()

# -------------------- Flashcards --------------------
@router.post("/flashcards", response_model=schemas.FlashcardResponse)
def create_flashcards(data: schemas.FlashcardRequest):
    """Generate flashcards from given content"""
    if not data.content.strip():
        return {"flashcards": []}
    try:
        flashcards = models.generate_flashcards_logic(data.content)
        return {"flashcards": flashcards}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Flashcard generation failed: {str(e)}"
        )

# -------------------- Notes --------------------
@router.post("/notes", response_model=schemas.NotesResponse)
def create_notes(data: schemas.NotesRequest):
    """Generate notes from given content"""
    if not data.content.strip():
        return {"notes": ""}
    try:
        notes = models.generate_notes_logic(data.content)
        return {"notes": notes}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Notes generation failed: {str(e)}"
        )

# -------------------- Quiz --------------------
@router.post("/quiz", response_model=schemas.QuizResponse)
def create_quiz(data: schemas.QuizRequest):
    """Generate quiz from given content"""
    if not data.content.strip():
        return {"quiz": []}
    try:
        quiz = models.generate_quiz_logic(data.content)
        return {"quiz": quiz}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Quiz generation failed: {str(e)}"
        )

# -------------------- Health check --------------------
@router.get("/ping")
def ping():
    """Simple health check endpoint"""
    return {"message": "pong 🏓"}
