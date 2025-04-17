import re
import spacy

nlp = spacy.load("en_core_web_md")

def clean_text(text):
    return re.sub(r'[^\w\s]', '', text.lower())

def match_keywords(resume_text, jd_text):
    resume_words = set(clean_text(resume_text).split())
    jd_words = set(clean_text(jd_text).split())

    common = jd_words.intersection(resume_words)
    missing = jd_words.difference(resume_words)

    score = int((len(common) / len(jd_words)) * 100) if jd_words else 0

    return {
        "score": score,
        "matched_keywords": sorted(list(common)),
        "missing_keywords": sorted(list(missing))
    }

def semantic_match(resume_text, jd_text):
    # 🧠 Truncate long text to avoid spaCy hang
    resume_text = resume_text[:3000]
    jd_text = jd_text[:1500]

    resume_doc = nlp(resume_text)
    jd_doc = nlp(jd_text)

    jd_keywords = list(set([token.text.lower() for token in jd_doc if token.is_alpha and not token.is_stop]))
    resume_keywords = list(set([token.text.lower() for token in resume_doc if token.is_alpha and not token.is_stop]))

    matched = []
    unmatched = []

    # ⏩ Preload resume vectors to avoid reprocessing
    resume_vectors = {
        word: nlp(word)[0]
        for word in resume_keywords
        if word.strip() and nlp(word)[0].has_vector and nlp(word)[0].vector_norm != 0
    }

    for keyword in jd_keywords:
        keyword_token = nlp(keyword)[0]
        if not keyword_token.has_vector or keyword_token.vector_norm == 0:
            continue

        match_found = False
        for res_word, res_token in resume_vectors.items():
            sim_score = keyword_token.similarity(res_token)
            if sim_score > 0.75:
                matched.append((keyword, res_word, round(sim_score, 2)))
                match_found = True
                break

        if not match_found:
            unmatched.append(keyword)

    score = int((len(matched) / len(jd_keywords)) * 100) if jd_keywords else 0

    return {
        "semantic_score": score,
        "semantically_matched": matched,
        "semantically_missing": unmatched
    }
