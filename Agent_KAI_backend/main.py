# backend/main.py
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import boto3
import uuid

app = FastAPI()

# Allow frontend access (adjust origin for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # e.g., ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AWS clients
s3_client = boto3.client("s3", region_name="us-east-1")
bedrock_agent = boto3.client("bedrock-agent-runtime", region_name="us-east-1")

# Replace with your bucket name
BUCKET_NAME = "hrbotresumestorage"

# -----------------------------
# 📂 Upload Endpoint
# -----------------------------
@app.post("/upload")
async def upload_files(files: list[UploadFile] = File(...)):
    uploaded_files = []

    try:
        for file in files:
            file_ext = file.filename.split('.')[-1]
            unique_filename = f"{uuid.uuid4()}.{file_ext}"

            # Upload each file to S3
            s3_client.upload_fileobj(file.file, BUCKET_NAME, unique_filename)
            file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{unique_filename}"

            uploaded_files.append({
                "original_name": file.filename,
                "uploaded_name": unique_filename,
                "file_url": file_url
            })

        return {"message": "Files uploaded successfully", "files": uploaded_files}

    except Exception as e:
        return {"error": str(e)}

# -----------------------------
# 💬 Chat Endpoint
# -----------------------------
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        session_id = str(uuid.uuid4())
        user_input = req.message

        # Invoke Bedrock Agent
        response = bedrock_agent.invoke_agent(
            agentId="S8RNS7VDRF",          # your Bedrock Agent ID
            agentAliasId="68QKMHX3JK",     # your Agent Alias ID
            sessionId=session_id,
            inputText=user_input
        )

        # Stream & collect response text
        result_text = ""
        for event in response["completion"]:
            if "chunk" in event:
                result_text += event["chunk"]["bytes"].decode("utf-8")
            elif "finalResponse" in event:
                break

        return {"reply": result_text}
    except Exception as e:
        return {"error": str(e)}

# -----------------------------
# 🏆 Resume Scoring Endpoint
# -----------------------------
from scorer_agent import ScorerAgent

scorer_agent_instance = ScorerAgent()

@app.post("/score")
async def score_resumes(
    files: list[UploadFile] = File(...),
    job_description: str = Form(...)
):
    print(f"DEBUG: Received /score request. Files: {len(files)}")
    results = []
    
    try:
        for file in files:
            print(f"DEBUG: Processing file: {file.filename}")
            content = await file.read()
            # Extract text
            resume_text = scorer_agent_instance.extract_text_from_file(content, file.filename)
            print(f"DEBUG: Text extracted. Length: {len(resume_text)}")
            
            # Score logic
            if resume_text.startswith("Error"):
                score_data = {"score": 0, "summary": f"Failed to parse resume: {resume_text}"}
            else:
                score_data = scorer_agent_instance.score_resume(resume_text, job_description)
            
            results.append({
                "resumeName": file.filename,
                "score": score_data.get("score", 0),
                "summary": score_data.get("summary", "No summary provided.")
            })
            
        return {"results": results}

    except Exception as e:
        print(f"DEBUG: Endpoint Error: {e}")
        return {"error": str(e)}