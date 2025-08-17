from pydantic import BaseModel
from typing import List

# Flashcards
class Flashcard(BaseModel):
    id: int
    front: str
    back: str

class FlashcardRequest(BaseModel):
    content: str

class FlashcardResponse(BaseModel):
    flashcards: List[Flashcard]

# Notes
class NotesRequest(BaseModel):
    content: str

class NotesResponse(BaseModel):
    notes: str

# Quiz
class QuizQuestion(BaseModel):
    id: int
    question: str
    options: List[str]
    answer: str

class QuizRequest(BaseModel):
    content: str

class QuizResponse(BaseModel):
    quiz: List[QuizQuestion]
