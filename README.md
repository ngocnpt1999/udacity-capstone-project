# Serverless Pokemon Note App

The app allows users to create, retrieve, update, and delete Pokemon notes.

## Setup

1. **Node.js 16**
2. **AWS CLI**
3. **Serverless Framework**
   ```bash
   npm install -g serverless
   serverless --version
   ```
   - Login and configure serverless to use the AWS credentials
   ```bash
   # Login to your dashboard from the CLI. It will ask to open your browser and finish the process.
   serverless login
   # Configure serverless to use the AWS credentials to deploy the application
   # You need to have a pair of Access key (YOUR_ACCESS_KEY_ID and YOUR_SECRET_KEY) of an IAM user with Admin access permissions
   sls config credentials --provider aws --key YOUR_ACCESS_KEY_ID --secret YOUR_SECRET_KEY --profile serverless
   ```

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install --save-dev
sls deploy -v
```

## Frontend

To run a client application first edit the `frontend/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd frontend
npm install --save-dev
npm run start
```

# Testing

Import the Postman collection `Udacity_Capstone_Project.postman_collection.json` to test API. It includes API endpoint and sample requests.

# Author

ngocnpt1999
