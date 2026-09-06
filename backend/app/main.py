from fastapi import FastAPI
from backend.app.database import engine, Base
from backend.app.models.job import Job

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Job Scraper API")


@app.get("/")
def home():
    return {"message": "AI Job Scraper Backend is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}