# Hospital Triage Assistant

A small full-stack hospital intake app built with:

- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI + LangGraph
- AI routing: Gemini through `langchain-google-genai`

## What it does

- Runs a polite, chat-style intake
- Asks one question at a time
- Collects patient name, age, and main concern
- Routes the case into `General`, `Emergency`, or `Mental Health`
- Shows a patient summary card and ward badge in the UI

## Project structure

```text
backend/
  app/
    main.py
    models.py
    triage_graph.py
  .env.example
  requirements.txt

frontend/
  src/
    components/
  package.json
```

## Backend setup

Create `backend/.env` from the example and add your Gemini key:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
```

Install Python packages:

```bash
cd backend
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn app.main:app --reload
```

The API will start on `http://127.0.0.1:8000`.

## Frontend setup

Install dependencies:

```bash
cd frontend
npm install
```

Optional: set a custom backend URL in `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Run the frontend:

```bash
npm run dev
```

The app will start on `http://127.0.0.1:5173`.

## Notes

- The backend keeps sessions in memory for simplicity.
- If `GOOGLE_API_KEY` is missing or Gemini is unavailable, the app falls back to keyword-based ward routing.
- This app is an intake demo and does not replace real medical advice.
