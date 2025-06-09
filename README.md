# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
 ## 1. Create a test user (already created for you)
    Email: amkaba@usfca.edu
    Password: Hello123!
  
## 2. Get a JWT Bearer Token
Authenticate using the AWS CLI (replace CLIENT_ID):
  aws cognito-idp initiate-auth \
  --client-id 5eafptqq9nf6n45cotl1f3jo14 \
  --auth-flow USER_PASSWORD_AUTH \
  --auth-parameters USERNAME=amkaba@usfca.edu,PASSWORD=Hello123!

## 3. Usage
#### POST /payments
#### Endpoint: https://cmydwv9gt8.execute-api.eu-west-3.amazonaws.com/prod/payments

#### Example curl command
curl -X POST "https://cmydwv9gt8.execute-api.eu-west-3.amazonaws.com/prod/payments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_id_token>" \
  -d '{
    "paymentId": "06cfc5b2-b7b7-4e22-9b3c-ffcfaa6b5d3c",
    "userId": "7c3a3c86-3650-4df4-9046-f5e10834139f",
    "timestamp": "2025-06-08T23:33:00Z",
    "description": "Netflix",
    "currency": "USD",
    "amount": 9.99
  }'

