import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// -------------------- Tailwind Helper --------------------
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// -------------------- Interfaces --------------------
export interface Flashcard {
  id: number;
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

// -------------------- Backend URL --------------------
const BASE_URL = "http://127.0.0.1:8000";

// -------------------- API CALLS --------------------
export async function generateFlashcards(content: string): Promise<Flashcard[]> {
  try {
    const res = await fetch(`${BASE_URL}/flashcards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    return (data.flashcards || []).map((card: any, idx: number) => ({
      id: card.id ?? idx,
      front: card.front,
      back: card.back,
    })) as Flashcard[];
  } catch (err) {
    console.error("Flashcards API call failed:", err);
    throw err;
  }
}

export async function generateNotes(content: string): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    return data.notes as string;
  } catch (err) {
    console.error("Notes API call failed:", err);
    throw err;
  }
}

export async function generateQuiz(content: string): Promise<QuizQuestion[]> {
  try {
    const res = await fetch(`${BASE_URL}/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    return (data.quiz || []).map((q: any, idx: number) => ({
      id: q.id ?? idx,
      question: q.question,
      options: q.options ?? [],
      answer: q.answer,
    })) as QuizQuestion[];
  } catch (err) {
    console.error("Quiz API call failed:", err);
    throw err;
  }
}

// -------------------- Download Helper --------------------
export function downloadAsFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
