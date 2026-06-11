from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from pydantic import BaseModel
from typing import TypedDict, Literal, Optional
import json
import httpx
import os
from datetime import datetime
# from .supabase_client import supabase  # optional for demo

llm = ChatOpenAI(
    model="gpt-4o-mini", 
    temperature=0.3, 
    openai_api_key=os.getenv("OPENAI_API_KEY") or "dummy-key-for-demo-only-do-not-use-in-prod"
)

class State(TypedDict):
    messages: list
    patient_name: Optional[str]
    patient_age: Optional[int]
    patient_query: Optional[str]
    ward: Optional[Literal["General Ward", "Emergency Ward", "Mental Health Ward"]]
    next_question: Optional[str]

def classify_ward(state: State) -> State:
    if state.get("ward"):
        return state
    prompt = f"""Classify this patient message into exactly one ward:
    General Ward, Emergency Ward, or Mental Health Ward.
    Message: {state['messages'][-1]}
    Respond with ONLY the ward name."""
    response = llm.invoke(prompt)
    ward = response.content.strip()
    if "emergency" in ward.lower():
        ward = "Emergency Ward"
    elif "mental" in ward.lower():
        ward = "Mental Health Ward"
    else:
        ward = "General Ward"
    state["ward"] = ward
    return state

def collect_info(state: State) -> State:
    missing = []
    if not state.get("patient_name"): missing.append("name")
    if not state.get("patient_age"): missing.append("age")
    if not state.get("patient_query"): missing.append("query")

    if not missing:
        # Complete → save + webhook
        payload = {
            "patient_name": state["patient_name"],
            "patient_age": state["patient_age"],
            "patient_query": state["patient_query"],
            "ward": state["ward"],
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
        supabase.table("patients").insert(payload).execute()

        webhook_url = os.getenv("RELAY_WEBHOOK_URL")
        if webhook_url:
            httpx.post(webhook_url, json=payload, timeout=10)

        state["messages"].append({"role": "assistant", "content": "Thank you! Your request has been forwarded to the appropriate ward."})
        return state

    # Ask one question at a time
    if "name" in missing:
        state["next_question"] = "May I know your full name please?"
    elif "age" in missing:
        state["next_question"] = "What is your age?"
    elif "query" in missing:
        state["next_question"] = "Please describe your concern or symptoms in detail."
    return state

def router(state: State):
    if not state.get("ward"):
        return "classify_ward"
    return "collect_info"

workflow = StateGraph(State)
workflow.add_node("classify_ward", classify_ward)
workflow.add_node("collect_info", collect_info)
workflow.set_entry_point("classify_ward")
workflow.add_conditional_edges("classify_ward", router, {"classify_ward": "classify_ward", "collect_info": "collect_info"})
workflow.add_conditional_edges("collect_info", lambda s: END if "Thank you" in s["messages"][-1]["content"] else "collect_info", {END: END, "collect_info": "collect_info"})

graph = workflow.compile()