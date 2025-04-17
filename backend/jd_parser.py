from PyPDF2 import PdfReader
import io
import logging

# Optional: Set up basic logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def extract_text_from_jd(file_bytes: bytes, filename: str) -> str:
    """
    Extracts text from a job description file (PDF or text-based).
    
    Args:
        file_bytes: Raw bytes of the uploaded file
        filename: The name of the uploaded file
    
    Returns:
        Extracted plain text content from the JD file
    """
    filename = filename.lower()

    if filename.endswith(".pdf"):
        try:
            reader = PdfReader(io.BytesIO(file_bytes))
            extracted_text = "\n".join([page.extract_text() or "" for page in reader.pages])
            logger.info("Successfully extracted text from PDF.")
            return extracted_text
        except Exception as e:
            logger.warning(f"PDF extraction failed: {e}")
            return f"Error reading PDF: {str(e)}"

    else:
        try:
            decoded = file_bytes.decode("utf-8")
            logger.info("Successfully decoded text as UTF-8.")
            return decoded
        except UnicodeDecodeError:
            logger.warning("UTF-8 decode failed. Falling back to latin-1.")
            return file_bytes.decode("latin-1", errors="ignore")
