from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uuid
import boto3
import json

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Bedrock client
bedrock_agent = boto3.client("bedrock-agent-runtime", region_name="us-east-1")


@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    session_id = str(uuid.uuid4())

    response = bedrock_agent.invoke_agent(
        agentId="S8RNS7VDRF",
        agentAliasId="68QKMHX3JK",
        sessionId=session_id,
        inputText=user_message,
    )

    full_response = ""
    for event in response["completion"]:
        if "chunk" in event:
            full_response += event["chunk"]["bytes"].decode("utf-8")

    return {"reply": full_response}
