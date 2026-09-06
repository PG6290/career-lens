from fastapi import FastAPI
from app.database import engine, Base
from app.models.job import Job
from app.models.user import User
from app.routes.jobs import router as jobs_router
from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Job Scraper API")


@app.get("/")
def home():
    return {"message": "AI Job Scraper Backend is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


app.include_router(jobs_router)
app.include_router(auth_router)
app.include_router(resume_router)


