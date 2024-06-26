# aws-http-api-gateway-tutorial
how to create and deploy a simple serverless application using AWS Lambda, API Gateway, and S3.

# Simple Serverless Application

This repository contains the code and instructions to create a simple serverless application using AWS Lambda, API Gateway, and S3. The application allows you to create, read, update, and delete items in a DynamoDB table through a web interface.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Architecture](#architecture)
- [Setup](#setup)
  - [Step 1: Create DynamoDB Table](#step-1-create-dynamodb-table)
  - [Step 2: Create Lambda Functions](#step-2-create-lambda-functions)
  - [Step 3: Set Up API Gateway](#step-3-set-up-api-gateway)
  - [Step 4: Create S3 Bucket](#step-4-create-s3-bucket)
- [Testing with Postman](#testing-with-postman)
- [Deploying the HTML File](#deploying-the-html-file)
- [Credits](#credits)

## Prerequisites

- AWS Account
- AWS CLI installed and configured
- Basic knowledge of AWS services (Lambda, API Gateway, S3, DynamoDB)
- Node.js installed

## Architecture

1. **DynamoDB**: Stores the items.
2. **Lambda Functions**: Handle the create, read, update, and delete operations.
3. **API Gateway**: Exposes the Lambda functions as HTTP endpoints.
4. **S3**: Hosts the static HTML file.

## Setup

### Step 1: Create DynamoDB Table

1. Go to the DynamoDB service in the AWS Management Console.
2. Create a new table with the following details:
   - Table name: `ticket-dev-eya-test`
   - Primary key: `id` (String)

### Step 2: Create Lambda Functions

1. Go to the Lambda service in the AWS Management Console.
2. Create the following Lambda functions:

#### Create Item Function

- **Name**: `CreateItemFunction`
- **Runtime**: `Node.js 18.x`
- **Upload the zip file**: Upload the corresponding zip file from this repository to AWS Lambda.

#### Read Item Function

- **Name**: `ReadItemFunction`
- **Runtime**: `Node.js 18.x`
- **Upload the zip file**: Upload the corresponding zip file from this repository to AWS Lambda.

#### Update Item Function

- **Name**: `UpdateItemFunction`
- **Runtime**: `Node.js 18.x`
- **Upload the zip file**: Upload the corresponding zip file from this repository to AWS Lambda.

#### Delete Item Function

- **Name**: `DeleteItemFunction`
- **Runtime**: `Node.js 18.x`
- **Upload the zip file**: Upload the corresponding zip file from this repository to AWS Lambda.

### Step 3: Set Up API Gateway

1. Go to the API Gateway service in the AWS Management Console.
2. Create a new API of type HTTP.
3. Create the following endpoints and integrate each with the corresponding Lambda function:

- **POST** `/items`: Integrate with `CreateItemFunction`
- **GET** `/items/{id}`: Integrate with `ReadItemFunction`
- **PUT** `/items/{id}`: Integrate with `UpdateItemFunction`
- **DELETE** `/items/{id}`: Integrate with `DeleteItemFunction`

### Step 4: Create S3 Bucket

1. Go to the S3 service in the AWS Management Console.
2. Create a new bucket.
3. Upload the `index.html` file from this repository to the bucket.
4. Enable static website hosting on the bucket.

## Testing with Postman

You can test the API endpoints using Postman:

- **POST** `/items`: Send a request body with the item details.
- **GET** `/items/{id}`: Replace `{id}` with the item ID to retrieve.
- **PUT** `/items/{id}`: Replace `{id}` with the item ID and send a request body with updated details.
- **DELETE** `/items/{id}`: Replace `{id}` with the item ID to delete.

## Deploying the HTML File

1. Ensure the S3 bucket is set up for static website hosting.
2. Access the website using the URL provided by S3.

## Credits

This project was created by [Your Name]. It serves as a basic example of creating a serverless application using AWS services.
