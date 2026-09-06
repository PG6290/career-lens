from pydantic import BaseModel
from typing import Optional


class JobCreate(BaseModel):
    title: str
    company: str
    location: Optional[str] = None
    description: Optional[str] = None
    skills: Optional[str] = None
    url: Optional[str] = None


class JobResponse(JobCreate):
    id: int

    class Config:
        from_attributes = True