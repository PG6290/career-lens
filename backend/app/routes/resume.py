from fastapi import APIRouter, UploadFile, File, HTTPException
from pypdf import PdfReader
import io

router = APIRouter(prefix="/resume", tags=["Resume"])


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    # Check file type
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # Read uploaded file
    contents = await file.read()

    try:
        pdf = PdfReader(io.BytesIO(contents))

        text = ""

        for page in pdf.pages:
            extracted_text = page.extract_text()

            if extracted_text:
                text += extracted_text + "\n"

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from this PDF"
            )

        return {
            "message": "Resume uploaded successfully",
            "filename": file.filename,
            "text": text
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing resume: {str(e)}"
        )