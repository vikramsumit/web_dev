from __future__ import annotations

import os
import re
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import END, StateGraph

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")
load_dotenv()

EMERGENCY_KEYWORDS = (
    "chest pain",
    "heart pain",
    "pain in my heart",
    "pain in heart",
    "tightness in chest",
    "chest tightness",
    "chest pressure",
    "pressure in chest",
    "pain in chest",
    "difficulty breathing",
    "shortness of breath",
    "unconscious",
    "unresponsive",
    "severe bleeding",
    "bleeding heavily",
    "stroke",
    "seizure",
    "heart attack",
    "fainted",
    "collapsed",
    "suicidal",
    "overdose",
)

MENTAL_HEALTH_KEYWORDS = (
    "anxiety",
    "panic",
    "depressed",
    "depression",
    "stress",
    "can't sleep",
    "insomnia",
    "mental",
    "hopeless",
    "therapy",
    "self harm",
)

HEALTH_CONCERN_HINTS = (
    "pain",
    "fever",
    "cough",
    "vomit",
    "vomiting",
    "bleeding",
    "breathing",
    "breath",
    "dizzy",
    "dizziness",
    "anxiety",
    "panic",
    "stress",
    "injury",
    "swelling",
    "burning",
    "nausea",
    "headache",
    "depression",
    "suicidal",
    "palpitations",
)


def _normalize_content(content: Any) -> str:
    if isinstance(content, str):
        return content.strip()

    if isinstance(content, list):
        parts: list[str] = []
        for item in content:
            if isinstance(item, dict) and "text" in item:
                parts.append(str(item["text"]))
            else:
                parts.append(str(item))
        return " ".join(parts).strip()

    return str(content).strip()


def _build_llm() -> ChatGoogleGenerativeAI | None:
    if not os.getenv("GOOGLE_API_KEY"):
        return None

    model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    try:
        return ChatGoogleGenerativeAI(model=model_name, temperature=0)
    except Exception:
        return None


LLM = _build_llm()


def build_initial_state(session_id: str) -> dict[str, Any]:
    assistant_message = (
        "Welcome to the hospital reception desk. May I have the patient's name, please?"
    )
    return {
        "session_id": session_id,
        "stage": "awaiting_name",
        "patient_name": None,
        "patient_age": None,
        "patient_query": None,
        "ward": "Pending",
        "assistant_message": assistant_message,
        "validation_error": None,
        "classification_source": "not-run",
        "latest_user_message": "",
        "is_complete": False,
        "conversation": [
            {
                "role": "assistant",
                "content": assistant_message,
            }
        ],
    }


def _append_turn(state: dict[str, Any], role: str, content: str) -> None:
    if not content:
        return
    state.setdefault("conversation", []).append({"role": role, "content": content})


def _clean_name(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def _looks_like_health_concern(value: str) -> bool:
    lowered = value.lower()
    keyword_pool = EMERGENCY_KEYWORDS + MENTAL_HEALTH_KEYWORDS + HEALTH_CONCERN_HINTS
    return any(keyword in lowered for keyword in keyword_pool)


def _parse_age(value: str) -> int | None:
    match = re.search(r"\b(\d{1,3})\b", value)
    if not match:
        return None

    age = int(match.group(1))
    if 0 < age <= 120:
        return age
    return None


def _heuristic_classification(query: str) -> tuple[str, str]:
    lowered = query.lower()

    if any(keyword in lowered for keyword in EMERGENCY_KEYWORDS):
        return "Emergency", "keyword"

    # Treat common heart-related complaints conservatively even when phrasing
    # does not exactly match the explicit emergency keyword list.
    if "heart" in lowered and any(term in lowered for term in ("pain", "tight", "pressure", "burning", "ache")):
        return "Emergency", "keyword-heart"

    if "chest" in lowered and any(term in lowered for term in ("pain", "tight", "pressure", "burning", "ache")):
        return "Emergency", "keyword-chest"

    if any(keyword in lowered for keyword in ("palpitations", "rapid heartbeat", "irregular heartbeat")):
        return "Emergency", "keyword-heart"

    if any(keyword in lowered for keyword in MENTAL_HEALTH_KEYWORDS):
        return "Mental Health", "keyword"

    return "General", "default"


def _llm_classification(query: str, age: int | None) -> tuple[str, str]:
    if LLM is None:
        return _heuristic_classification(query)

    prompt = (
        "You are a hospital triage assistant. "
        "Classify the patient concern into exactly one category: "
        "General, Emergency, or Mental Health. "
        "Respond with only the category name.\n\n"
        f"Patient age: {age if age is not None else 'Unknown'}\n"
        f"Concern: {query}"
    )

    try:
        response = LLM.invoke([HumanMessage(content=prompt)])
        content = _normalize_content(response.content).lower()
    except Exception:
        return _heuristic_classification(query)

    if "emergency" in content:
        return "Emergency", "gemini"
    if "mental" in content:
        return "Mental Health", "gemini"
    return "General", "gemini"


def _classify_ward(query: str, age: int | None) -> tuple[str, str]:
    heuristic_ward, heuristic_source = _heuristic_classification(query)
    if heuristic_ward != "General":
        return heuristic_ward, heuristic_source
    return _llm_classification(query, age)


def start_node(state: dict[str, Any]) -> dict[str, Any]:
    state["validation_error"] = None
    message = state.get("latest_user_message", "").strip()
    stage = state.get("stage", "awaiting_name")

    if stage == "completed":
        return state

    if not message:
        state["validation_error"] = "Please share a response so I can continue the intake."
        return state

    _append_turn(state, "patient", message)

    if stage == "awaiting_name":
        cleaned_name = _clean_name(message)
        if _looks_like_health_concern(cleaned_name):
            state["validation_error"] = (
                "I will ask about the health concern in a moment. Please share the patient's name first."
            )
        elif cleaned_name:
            state["patient_name"] = cleaned_name
        else:
            state["validation_error"] = "Please tell me the patient's name."

    elif stage == "awaiting_age":
        age = _parse_age(message)
        if age is None:
            if _looks_like_health_concern(message):
                state["validation_error"] = (
                    "Thank you. Before I record the concern, please enter the patient's age as a number between 1 and 120."
                )
            else:
                state["validation_error"] = (
                    "Please enter the patient's age as a number between 1 and 120."
                )
        else:
            state["patient_age"] = age

    elif stage == "awaiting_query":
        state["patient_query"] = message

    return state


def router_node(state: dict[str, Any]) -> dict[str, Any]:
    stage = state.get("stage", "awaiting_name")
    validation_error = state.get("validation_error")

    if stage == "completed":
        state["next_step"] = "completed"
        return state

    if stage == "awaiting_name":
        state["next_step"] = "ask_name" if validation_error else "ask_age"
        return state

    if stage == "awaiting_age":
        state["next_step"] = "ask_age" if validation_error else "ask_query"
        return state

    if stage == "awaiting_query":
        state["next_step"] = "ask_query" if validation_error else "classify_ward"
        return state

    state["next_step"] = "ask_name"
    return state


def ask_name_node(state: dict[str, Any]) -> dict[str, Any]:
    message = state.get("validation_error") or (
        "Welcome to the hospital reception desk. May I have the patient's name, please?"
    )
    state["stage"] = "awaiting_name"
    state["assistant_message"] = message
    _append_turn(state, "assistant", message)
    return state


def ask_age_node(state: dict[str, Any]) -> dict[str, Any]:
    if state.get("validation_error"):
        message = state["validation_error"]
    else:
        name = state.get("patient_name", "the patient")
        message = f"Thank you, {name}. May I know the patient's age?"

    state["stage"] = "awaiting_age"
    state["assistant_message"] = message
    _append_turn(state, "assistant", message)
    return state


def ask_query_node(state: dict[str, Any]) -> dict[str, Any]:
    if state.get("validation_error"):
        message = state["validation_error"]
    else:
        message = (
            "Thank you. Please describe the patient's main health concern today."
        )

    state["stage"] = "awaiting_query"
    state["assistant_message"] = message
    _append_turn(state, "assistant", message)
    return state


def classify_ward_node(state: dict[str, Any]) -> dict[str, Any]:
    ward, source = _classify_ward(
        state.get("patient_query", ""),
        state.get("patient_age"),
    )
    state["ward"] = ward
    state["classification_source"] = source
    return state


def general_ward_node(state: dict[str, Any]) -> dict[str, Any]:
    name = state.get("patient_name", "patient")
    message = (
        f"Thank you, {name}. Based on this intake, I am routing the case to the "
        "General Ward for standard clinical assessment. If symptoms suddenly worsen, "
        "please alert hospital staff immediately."
    )
    state["stage"] = "completed"
    state["assistant_message"] = message
    state["is_complete"] = True
    _append_turn(state, "assistant", message)
    return state


def emergency_ward_node(state: dict[str, Any]) -> dict[str, Any]:
    name = state.get("patient_name", "patient")
    message = (
        f"Thank you, {name}. This concern appears urgent, so I am routing the case "
        "to the Emergency Ward now. Please seek immediate in-person assistance from "
        "hospital staff or local emergency services right away."
    )
    state["stage"] = "completed"
    state["assistant_message"] = message
    state["is_complete"] = True
    _append_turn(state, "assistant", message)
    return state


def mental_health_ward_node(state: dict[str, Any]) -> dict[str, Any]:
    name = state.get("patient_name", "patient")
    message = (
        f"Thank you, {name}. I am routing the case to the Mental Health Ward so the "
        "patient can receive focused support. If there is any immediate risk of self-harm "
        "or harm to others, please contact emergency services right away."
    )
    state["stage"] = "completed"
    state["assistant_message"] = message
    state["is_complete"] = True
    _append_turn(state, "assistant", message)
    return state


def completed_node(state: dict[str, Any]) -> dict[str, Any]:
    message = (
        "This intake is already complete. Please start a new patient session for a new case."
    )
    state["assistant_message"] = message
    _append_turn(state, "assistant", message)
    return state


def _conversation_router(state: dict[str, Any]) -> str:
    return state["next_step"]


def _ward_router(state: dict[str, Any]) -> str:
    ward = state.get("ward", "General").lower()
    if "emergency" in ward:
        return "emergency_ward"
    if "mental" in ward:
        return "mental_health_ward"
    return "general_ward"


builder = StateGraph(dict)
builder.add_node("start_node", start_node)
builder.add_node("router_node", router_node)
builder.add_node("ask_name", ask_name_node)
builder.add_node("ask_age", ask_age_node)
builder.add_node("ask_query", ask_query_node)
builder.add_node("classify_ward", classify_ward_node)
builder.add_node("general_ward", general_ward_node)
builder.add_node("emergency_ward", emergency_ward_node)
builder.add_node("mental_health_ward", mental_health_ward_node)
builder.add_node("completed", completed_node)

builder.set_entry_point("start_node")
builder.add_edge("start_node", "router_node")
builder.add_conditional_edges(
    "router_node",
    _conversation_router,
    {
        "ask_name": "ask_name",
        "ask_age": "ask_age",
        "ask_query": "ask_query",
        "classify_ward": "classify_ward",
        "completed": "completed",
    },
)
builder.add_conditional_edges(
    "classify_ward",
    _ward_router,
    {
        "general_ward": "general_ward",
        "emergency_ward": "emergency_ward",
        "mental_health_ward": "mental_health_ward",
    },
)
builder.add_edge("ask_name", END)
builder.add_edge("ask_age", END)
builder.add_edge("ask_query", END)
builder.add_edge("general_ward", END)
builder.add_edge("emergency_ward", END)
builder.add_edge("mental_health_ward", END)
builder.add_edge("completed", END)

graph = builder.compile()


def run_triage_turn(session_state: dict[str, Any], message: str) -> dict[str, Any]:
    next_state = {**session_state, "latest_user_message": message}
    return graph.invoke(next_state)


def build_patient_summary(state: dict[str, Any]) -> dict[str, Any]:
    return {
        "name": state.get("patient_name"),
        "age": state.get("patient_age"),
        "query": state.get("patient_query"),
        "ward": state.get("ward", "Pending"),
    }
