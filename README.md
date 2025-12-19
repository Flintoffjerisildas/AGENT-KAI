# Agent KAI — Talent Intelligence Agent

Agent KAI is an AI-powered Talent Intelligence Agent designed to assist HR teams with Onboarding, Employee Support, and Performance Tracking. It leverages **Amazon Bedrock** for generative AI capabilities and a **React** frontend for an interactive chat experience.

## 📋 Prerequisites

Before running the project, ensure you have:

-   **Node.js** (v18+ recommended) & **npm**
-   **Python** (v3.8+)
-   **AWS Account** with access to:
    -   **Amazon Bedrock** (Model access enabled, e.g., Amazon Nova Pro)
    -   **Amazon S3**
    -   **AWS Lambda**
-   **AWS CLI** configured (`aws configure`).

## 📂 Project Structure

-   `Agent_KAI_backend/`: FastAPI backend for handling chat and file uploads.
-   `Agent_KAI_frontend/`: React + Vite frontend application.

## ⚙️ Configuration

**Important**: This application requires your own AWS resources. You must configure the following variables before running the application.

### Backend Configuration
Open `Agent_KAI_backend/main.py` (or create a `.env` file if supported) and update the following placeholders with your actual resource IDs:

-   `BUCKET_NAME`: Your unique S3 bucket name for storing resumes.
-   `AGENT_ID`: The ID of your Amazon Bedrock Agent.
-   `AGENT_ALIAS_ID`: The Alias ID of your Bedrock Agent.
-   `REGION_NAME`: Your AWS Region (e.g., `us-east-1`).

**Security Note**: Never commit actual API keys or sensitive Resource IDs to public version control.

## 🚀 Installation & Local Run

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd Agent_KAI_backend
    ```

2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

3.  Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the server**:
    ```bash
    uvicorn main:app --reload
    ```
    The server will start at `http://localhost:8000`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd Agent_KAI_frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will run at `http://localhost:5173`.

## ☁️ Deployment Guide

This section outlines how to deploy the Agent KAI backend infrastructure on AWS.

### Architecture
1.  **Amazon S3**: Stores user-uploaded resumes.
2.  **AWS Lambda**: Triggers on S3 upload to process documents.
3.  **Amazon Bedrock**: Powers the generative AI agent.
4.  **FastAPI Backend**: Middleware between frontend and AWS.

### Deployment Steps

#### Step 1: AWS Infrastructure Setup
You can deploy the necessary resources manually or using Infrastructure as Code (CloudFormation).

1.  **Create S3 Bucket**: Create a bucket (e.g., `your-unique-resume-bucket`).
2.  **Create Bedrock Agent**:
    -   Go to Amazon Bedrock console.
    -   Create an Agent (e.g., "Talent-Agent").
    -   Select a model (e.g., Amazon Nova Pro).
    -   Define instructions: "You are a Talent Intelligence Agent...".
    -   **Note the Agent ID and Alias ID**.
3.  **Create Lambda Function** (Optional but recommended for data extraction):
    -   Create a function to parse PDFs from S3.
    -   Grant it `s3:GetObject` and `bedrock:InvokeModel` permissions.

#### Step 2: Configure Application
Once your AWS resources are ready, update the `Agent_KAI_backend` configuration as described in the **Configuration** section above.

#### Step 3: Production Build
To build the frontend for production:
```bash
cd Agent_KAI_frontend
npm run build
```
This generates static files in `dist/` which can be hosted on S3, Vercel, or served by the backend.

## 📦 IAM Permissions
Ensure your IAM User/Role has the following permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["bedrock:*", "lambda:*", "s3:*"],
      "Resource": "*"
    }
  ]
}
```
