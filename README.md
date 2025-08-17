\# StudyPack AI



\*\*AI-powered study companion for students\*\* – generate flashcards, notes, and quizzes from any text input, with offline download options for learning on-the-go.



---



\## Table of Contents



\- \[Description](#description)

\- \[Features](#features)

\- \[Tech Stack](#tech-stack)

\- \[Setup \& Installation](#setup--installation)

\- \[Usage](#usage)

\- \[Future Plans](#future-plans)

\- \[License](#license)



---



\## Description



StudyPack AI is an AI-powered application designed to help students efficiently create study materials. Users can generate flashcards, structured notes, and quizzes directly from their input content. The generated study material can also be downloaded for offline use, making it ideal for students with limited or intermittent internet access.



---



\## Features



\- Generate \*\*flashcards\*\*, \*\*notes\*\*, and \*\*quizzes\*\* from user input.

\- Offline download options for all generated content (CSV, TXT, MD).

\- Interactive flashcard viewer with flipping, shuffling, and progress tracking.

\- Copy notes to clipboard with a single click.

\- Designed for students with limited internet access to study anywhere.



---



\## Tech Stack



\*\*Backend:\*\*

\- Python

\- FastAPI

\- Uvicorn

\- Pydantic

\- Gemini API 2.5-flash-lite



\*\*Frontend:\*\*

\- TypeScript

\- React

\- Tailwind CSS

\- Lucide Icons



---



\## Setup \& Installation



\*\*Backend:\*\*



```bash

cd backend

python -m uvicorn main:app --reload

The backend server will run locally at http://127.0.0.1:8000.


\*\*Frontend:\*\*



cd frontend

npm install

npm run dev



Copy and Paste the displayed host link into the browser to access the frontend.





\## Environment Variables


Make sure to create a .env file in the backend with your Gemini API key:
GEMINI\_API\_KEY=your\_api\_key\_here





\## Usage



1. Open the application in your browser.



2\. Paste your study content in the input area.



3\. Click Generate Flashcards, Generate Notes, or Generate Quiz depending on what you want.



4\. Interact with flashcards by flipping or shuffling them.



5\. Download any generated content for offline access.



6\. Copy notes to clipboard if needed.



\## License



This project is licensed under the MIT License - see the \[LICENSE](LICENSE) file for details.



\## Acknowledgements



OpenAI Gemini API for AI-powered content generation.



Tailwind CSS and Lucide Icons for frontend styling.



Inspiration from students needing accessible study tools.

































