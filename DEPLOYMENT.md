# Agent KAI — AWS Deployment & Architecture Guide

This guide outlines how to deploy the **Agent KAI** backend infrastructure on AWS. The system leverages Amazon Bedrock, AWS Lambda, and Amazon S3.

## 🏗️ Architecture Overview

The backend processing pipeline consists of:

1.  **Amazon S3**: Stores user-uploaded resumes and documents (`hrbotresumestorage`).
2.  **AWS Lambda**: `ResumeDataExtractor` function (triggered by S3 events) to process documents.
3.  **Amazon Bedrock**: Powering the generative AI agent (Agent ID: `S8RNS7VDRF`, Model: `amazon.nova-pro-v1:0`).
4.  **FastAPI Backend**: Proxies credentials and manages sessions between the frontend and AWS services.

## 📋 Prerequisites

To deploy this architecture in your own AWS account, you need:

1.  **AWS Account** with permissions for:
    -   CloudFormation
    -   S3
    -   Lambda
    -   Bedrock (Model access enabled for Amazon Nova Pro)
    -   IAM (Role creation)
2.  **AWS CLI** installed and configured.

## 🚀 Deployment Steps

### 1. Infrastructure as Code (IaC)

To automate deployment, we recommend using a **CloudFormation** template.

#### Key Resources to Define:
-   **S3 Bucket**: For resume storage.
-   **IAM Roles**:
    -   Lambda execution role (read S3, invoke Bedrock).
    -   Bedrock Agent role (invoke Lambda, access Knowledge Bases if applicable).
-   **Lambda Function**: The Python code for `ResumeDataExtractor` (ensure `boto3` is included).
-   **Bedrock Agent**: Configuration for the "Talent Intelligence" agent.

### 2. Manual Deployment (Summary)

If deploying manually via the AWS Console:

1.  **Create S3 Bucket**: Name it unique (e.g., `agent-kai-resumes-123`).
2.  **Create Lambda**:
    -   Runtime: Python 3.9+
    -   Add trigger: S3 (Object Created on the new bucket).
3.  **Create Bedrock Agent**:
    -   Model: `amazon.nova-pro-v1:0` or model you prefer.
    -   Action Group: Link to your Lambda function.
    -   Instructions: "You are a Talent Intelligence Agent..."
4.  **Update API**:
    -   Update `Agent_KAI_backend/main.py` with your new `AGENT_ID`, `AGENT_ALIAS_ID`, and `BUCKET_NAME`.

## 📦 Sharing & Distribution

To share this agent with others:

1.  **GitHub Repository**:
    -   Include `Agent_KAI_backend` and `Agent_KAI_frontend`.
    -   Include a `cloudformation.yaml` (optional but recommended for reproducible processing logic).
    -   Document the specific **Prompt Engineering** used for the Bedrock Agent in a `PROMPTS.md` file.

2.  **Required IAM Permissions for Users**:
    Users deploying this will need the following policy:
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "bedrock:*",
            "lambda:*",
            "s3:*",
            "iam:CreateRole",
            "iam:AttachRolePolicy",
            "cloudformation:*"
          ],
          "Resource": "*"
        }
      ]
    }
    ```

## ⚙️ Configuration Parameters

When deploying, the following parameters should be customizable:

-   `BucketName`: S3 bucket for resumes.
-   `AgentName`: Name of the Bedrock agent.
-   `Region`: AWS Region (e.g., `us-east-1` where Bedrock Nova is available).
