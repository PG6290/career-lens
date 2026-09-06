import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY is not configured")

client = OpenAI(api_key=api_key)


def analyze_resume(resume_text: str):

    prompt = f"""
You are an expert technical recruiter and resume analyzer.

Analyze the following resume carefully.

Extract:
1. A concise professional summary
2. All technical and professional skills
3. Years of professional experience
4. Education
5. Recommended job roles
6. Important keywords
7. Strengths
8. Areas that could be improved

Do not invent information that is not present in the resume.

Return ONLY valid JSON in this exact structure:

{{
    "summary": "string",
    "skills": ["skill1", "skill2"],
    "experience_years": 0,
    "education": "string",
    "recommended_roles": ["role1", "role2"],
    "keywords": ["keyword1", "keyword2"],
    "strengths": ["strength1", "strength2"],
    "improvements": ["improvement1", "improvement2"]
}}

Resume:

{resume_text}
"""

    response = client.responses.create(
        model="gpt-5.6-luna",
        input=prompt
    )

    result_text = response.output_text

    try:
        return json.loads(result_text)
    except json.JSONDecodeError:
        return {
            "error": "AI returned an invalid response",
            "raw_response": result_text
        }