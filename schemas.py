from pydantic import BaseModel

class BugCreate(BaseModel):
    title: str
    description: str
    severity: str

class BugResponse(BugCreate):
    id: int

    class Config:
        from_attributes = True