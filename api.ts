// frontend/src/lib/api.ts
export const BACKEND_URL = "http://127.0.0.1:8000";

export async function generateStudyPack(data: {
  topic?: string;
  link?: string;
  file?: File;
  level?: string;
  include_quiz?: boolean;
  num_questions?: number;
}) {
  const formData = new FormData();
  if (data.topic) formData.append("topic", data.topic);
  if (data.link) formData.append("link", data.link);
  if (data.file) formData.append("file", data.file);
  formData.append("level", data.level || "highschool");
  formData.append("include_quiz", String(data.include_quiz ?? true));
  formData.append("num_questions", String(data.num_questions ?? 10));

  const response = await fetch(`${BACKEND_URL}/generate`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Backend error: ${response.statusText}`);
  }

  return response.json();
}
