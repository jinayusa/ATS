from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import extract_text_from_resume
from jd_parser import extract_text_from_jd
from matcher import match_keywords, semantic_match
from ats_checker import analyze_ats_format

app = FastAPI()  # ✅ app must be defined BEFORE using @app decorators

# CORS settings (React-friendly)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/analyze/")
async def analyze(resume: UploadFile = File(...), jd: UploadFile = File(...)):
    print("📥 Received request")

    resume_bytes = await resume.read()
    print("📄 Resume file read")

    jd_bytes = await jd.read()
    print("📝 JD file read")

    resume_text = extract_text_from_resume(resume_bytes, resume.filename)
    print("✅ Resume text extracted")

    jd_text = extract_text_from_jd(jd_bytes, jd.filename)
    print("✅ JD text extracted")

    keyword_result = match_keywords(resume_text, jd_text)
    print("✅ Keyword matching done")

    semantic_result = semantic_match(resume_text, jd_text)
    print("✅ Semantic matching done")

    ats_result = analyze_ats_format(resume_bytes, resume.filename)
    print("✅ ATS format analysis done")

    keyword_score = keyword_result["score"]
    semantic_score = semantic_result["semantic_score"]
    overall_score = int((0.4 * keyword_score) + (0.6 * semantic_score))

    print("🚀 Sending response")

    return {
        "overall_score": overall_score,
        "keyword_score": keyword_score,
        "semantic_score": semantic_score,
        "matched_keywords": keyword_result["matched_keywords"],
        "missing_keywords": keyword_result["missing_keywords"],
        "semantically_matched": semantic_result["semantically_matched"],
        "semantically_missing": semantic_result["semantically_missing"],
        "ats_score": ats_result["ats_score"]
    }
