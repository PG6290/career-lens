from fastapi import APIRouter, HTTPException
from app.services.ai_service import analyze_resume

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/analyze-resume")
def analyze_resume_api(resume_text: str):
    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Resume text cannot be empty"
        )

    result = analyze_resume(resume_text)

    return result