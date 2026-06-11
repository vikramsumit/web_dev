from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from .graph import graph, State
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Hospital Receptionist")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    conversation_id: str = "default"

# Simple in-memory store for demo (Supabase used only for final record)
conversations: Dict[str, State] = {}

@app.post("/chat")
async def chat(req: ChatRequest):
    if req.conversation_id not in conversations:
        conversations[req.conversation_id] = {
            "messages": [{"role": "assistant", "content": "Hello! I'm your AI hospital receptionist. How can I assist you today?"}],
            "patient_name": None,
            "patient_age": None,
            "patient_query": None,
            "ward": None,
            "next_question": None
        }

    state = conversations[req.conversation_id]
    state["messages"].append({"role": "user", "content": req.message})

    # Run LangGraph
    result = graph.invoke(state)
    conversations[req.conversation_id] = result

    return {
        "reply": result["messages"][-1]["content"],
        "ward": result.get("ward"),
        "patient_summary": {
            "name": result.get("patient_name"),
            "age": result.get("patient_age"),
            "query": result.get("patient_query"),
            "ward": result.get("ward")
        }
    }