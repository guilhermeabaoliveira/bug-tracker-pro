from pydantic import BaseModel
from typing import Optional # <--- Adicione esta importação

class BugCreate(BaseModel):
    title: str
    description: Optional[str] = "No description provided" # <--- Mude aqui
    severity: str

class BugResponse(BugCreate):
    id: int

    class Config:
        from_attributes = True