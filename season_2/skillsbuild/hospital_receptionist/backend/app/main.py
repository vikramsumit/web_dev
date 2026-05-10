from __future__ import annotations

from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .models import ChatRequest, ChatResponse, PatientSummary, StartSessionResponse
from .triage_graph import build_initial_state, build_patient_summary, run_triage_turn

app = FastAPI(title="Hospital Triage Assistant", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SESSIONS: dict[str, dict] = {}


def _to_response(session_id: str, state: dict) -> dict:
    return {
        "session_id": session_id,
        "assistant_message": state["assistant_message"],
        "patient_summary": PatientSummary(**build_patient_summary(state)),
        "ward": state.get("ward", "Pending"),
        "stage": state.get("stage", "awaiting_name"),
        "is_complete": state.get("is_complete", False),
    }


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/chat/start", response_model=StartSessionResponse)
def start_session() -> dict:
    session_id = str(uuid4())
    state = build_initial_state(session_id)
    SESSIONS[session_id] = state
    return _to_response(session_id, state)


@app.post("/api/chat/message", response_model=ChatResponse)
def send_message(payload: ChatRequest) -> dict:
    state = SESSIONS.get(payload.session_id)
    if state is None:
        raise HTTPException(status_code=404, detail="Session not found")

    updated_state = run_triage_turn(state, payload.message)
    SESSIONS[payload.session_id] = updated_state
    return _to_response(payload.session_id, updated_state)

