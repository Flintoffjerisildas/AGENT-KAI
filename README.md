# Agent KAI — Talent Intelligence Agent

Agent KAI is an AI-powered Talent Intelligence Agent designed to assist HR teams with Onboarding, Employee Support, and Performance Tracking. It leverages AWS Bedrock for generative AI capabilities and a React frontend for an interactive chat experience.

## Prerequisites

Before running the project, ensure you have the following installed:

-   **Node.js** (v18+ recommended) & **npm**
-   **Python** (v3.8+)
-   **AWS Account** with access to **Amazon Bedrock** and **S3**.
-   **AWS CLI** configured with credentials (`aws configure`).

## Project Structure

-   `Agent_KAI_backend/`: FastAPI backend for handling chat and file uploads.
-   `Agent_KAI_frontend/`: React + Vite frontend application.

## 🚀 Installation & Setup

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd Agent_KAI_backend
    ```

2.  Create and activate a virtual environment (optional but recommended):
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

4.  **Configuration**:
    The active agent configuration is currently located in `main.py`. Ensure you have access to the following AWS resources or update the IDs:
    -   **AWS Region**: `us-east-1`
    -   **S3 Bucket**: `hrbotresumestorage`
    -   **Bedrock Agent ID**: `S8RNS7VDRF`
    -   **Bedrock Agent Alias ID**: `68QKMHX3JK`
    
    *Note: Ensure your AWS CLI credentials have permissions to invoke this Bedrock agent and write to the S3 bucket.*

5.  Run the backend server:
    ```bash
    uvicorn main:app --reload
    ```
    The server will start at `http://localhost:8000`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd Agent_KAI_frontend
    ```

2.  Install Node.js dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```
    The frontend will start at `http://localhost:5173` (or the port shown in your terminal).

## 🌍 Environment Variables & Authentication

This project uses **AWS Boto3**, which automatically looks for credentials in your environment. You can set them temporarily in your terminal if you haven't used `aws configure`:

**Windows (PowerShell):**
```powershell
$env:AWS_ACCESS_KEY_ID="your_access_key"
$env:AWS_SECRET_ACCESS_KEY="your_secret_key"
$env:AWS_DEFAULT_REGION="us-east-1"
```

**Mac/Linux:**
```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=us-east-1
```

## ✨ Features

-   **Chat Interface**: Real-time interaction with the HR Agent.
-   **File Storage**: Upload resumes/documents to S3.
-   **Plans & Discovery**: View subscription plans and template libraries.
-   **Mobile Overlay**: Responsive sidebar for mobile devices.

## 📖 Deployment

For detailed instructions on deploying the AWS infrastructure (S3, Lambda, Bedrock Agent) and sharing the agent, please refer to the [Deployment Guide](../DEPLOYMENT.md).
