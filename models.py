import os
from typing import List
from dotenv import load_dotenv
from openai import OpenAI
from app import schemas

load_dotenv()

# -------------------- Gemini Client --------------------
client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),   
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

# -------------------- Helper --------------------
def call_gemini(prompt: str, max_tokens: int = 500):
    try:
        response = client.chat.completions.create(
            model="gemini-2.5-flash-lite",   # lightweight Gemini model
            messages=[{"role": "user", "content": prompt}],
            max_tokens=max_tokens,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print("Gemini API call failed:", e)
        return "Error generating content"

# -------------------- Flashcards --------------------
def generate_flashcards_logic(content: str) -> List[schemas.Flashcard]:
    if not content.strip():
        return []

    prompt = (
        f"Generate up to 10 clear Q&A flashcards from this content. "
        f"Format each as 'Q: ...' and 'A: ...':\n{content}"
    )
    result = call_gemini(prompt)

    cards = []
    lines = [line.strip() for line in result.split("\n") if line.strip()]
    i = 0
    while i < len(lines) and len(cards) < 10:
        line = lines[i]
        if line.startswith("Q:"):
            q = line[2:].strip()
            a = "No answer"
            if i + 1 < len(lines) and lines[i + 1].startswith("A:"):
                a = lines[i + 1][2:].strip()
                i += 1
            cards.append(schemas.Flashcard(id=len(cards)+1, front=q, back=a))
        i += 1
    return cards

# -------------------- Notes --------------------
def generate_notes_logic(content: str) -> str:
    if not content.strip():
        return ""
    
    prompt = f"Generate clear markdown-style study notes from this content:\n{content}"
    result = call_gemini(prompt, max_tokens=800)
    return result

# -------------------- Quiz --------------------
def generate_quiz_logic(content: str) -> List[schemas.QuizQuestion]:
    if not content.strip():
        return []

    prompt = (
        f"Create 5 multiple choice questions from this content. Format each as:\n"
        f"Question: ...\nOptions: option1, option2, option3, option4\nAnswer: ...\n{content}"
    )
    result = call_gemini(prompt, max_tokens=700)

    quiz = []
    lines = [line.strip() for line in result.split("\n") if line.strip()]
    i = 0
    while i + 2 < len(lines) and len(quiz) < 5:
        try:
            question_line = lines[i].replace("Question:", "").strip()
            options_line = lines[i + 1].replace("Options:", "").strip()
            answer_line = lines[i + 2].replace("Answer:", "").strip()
            options = [opt.strip() for opt in options_line.split(",") if opt.strip()]
            if len(options) < 2:
                options = ["Option 1", "Option 2", "Option 3", "Option 4"]
            quiz.append(
                schemas.QuizQuestion(
                    id=len(quiz)+1,
                    question=question_line,
                    options=options,
                    answer=answer_line
                )
            )
            i += 3
        except Exception as e:
            print("Error parsing quiz line:", e)
            i += 1
    return quiz
