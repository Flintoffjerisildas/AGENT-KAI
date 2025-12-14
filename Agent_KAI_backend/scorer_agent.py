import os
import json
from groq import Groq
import pypdf
import docx
from dotenv import load_dotenv

load_dotenv()

class ScorerAgent:
    def __init__(self):
        self.api_key = os.environ.get("GROQ_API_KEY_AGENT_KA_SCORER") or os.environ.get("GROQ_API_KEY")
        if not self.api_key:
            print("Warning: GROQ_API_KEY_AGENT_KA_SCORER (or GROQ_API_KEY) not found in environment variables.")
        self.client = Groq(api_key=self.api_key)

    def extract_text_from_file(self, file_content: bytes, filename: str) -> str:
        """Extracts text from PDF or DOCX file content."""
        ext = filename.split('.')[-1].lower()
        
        try:
            if ext == 'pdf':
                return self._extract_from_pdf(file_content)
            elif ext in ['docx', 'doc']:
                return self._extract_from_docx(file_content)
            else:
                return "Unsupported file format."
        except Exception as e:
            return f"Error extracting text: {str(e)}"

    def _extract_from_pdf(self, file_content: bytes) -> str:
        import io
        pdf_file = io.BytesIO(file_content)
        reader = pypdf.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text

    def _extract_from_docx(self, file_content: bytes) -> str:
        import io
        docx_file = io.BytesIO(file_content)
        doc = docx.Document(docx_file)
        text = "\n".join([para.text for para in doc.paragraphs])
        return text

    def score_resume(self, resume_text: str, job_description: str) -> dict:
        """Evaluates a resume against a job description using Groq."""
        if not self.api_key:
            print("Error: API Key missing in score_resume")
            return {"score": 0, "summary": "Error: Groq API key not configured."}

        print(f"DEBUG: Scoring resume. Text length: {len(resume_text)}")
        
        # Improved Prompt for JSON mode compatibility
        messages = [
            {
                "role": "system",
                "content": "You are an expert HR AI Assistant. Evaluate the resume against the job description. Return JSON only with keys: 'score' (0-100), 'summary' (brief justification), 'strengths' (list of 3-5 key strong points), and 'weaknesses' (list of 3-5 potential gaps or missing skills)."
            },
            {
                "role": "user",
                "content": f"Job Description:\n{job_description}\n\nResume:\n{resume_text[:10000]}"
            }
        ]

        try:
            print("DEBUG: Sending request to Groq SDK...")
            completion = self.client.chat.completions.create(
                model="llama-3.3-70b-versatile", # Updated to supported model
                messages=messages,
                temperature=0.1,
                response_format={"type": "json_object"}
            )
            
            result_json = completion.choices[0].message.content
            print(f"DEBUG: Groq response received: {result_json[:100]}...")
            return json.loads(result_json)
        except Exception as e:
            print(f"DEBUG: Groq API Error: {e}")
            return {"score": 0, "summary": f"Error during scoring: {str(e)}"}
