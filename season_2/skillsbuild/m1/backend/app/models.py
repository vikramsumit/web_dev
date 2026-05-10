from __future__ import annotations

from typing import Literal, Optional

from pydantic import BaseModel, Field

WardName = Literal["Pending", "General", "Emergency", "Mental Health"]
StageName = Literal["awaiting_name", "awaiting_age", "awaiting_query", "completed"]


class PatientSummary(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    query: Optional[str] = None
    ward: WardName = "Pending"


class StartSessionResponse(BaseModel):
    session_id: str
    assistant_message: str
    patient_summary: PatientSummary
    ward: WardName
    stage: StageName
    is_complete: bool


class ChatRequest(BaseModel):
    session_id: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1, max_length=1000)


class ChatResponse(StartSessionResponse):
    pass

