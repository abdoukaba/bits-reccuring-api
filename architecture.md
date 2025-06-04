# Architecture

## 1. High Level System Design

Diagram:

#### 1. User → 2. API Gateway → 3. Lambda (validation/business logic) → 4. DynamoDB (save payment)
####               ||
#### Cognito used for secure authentication.


### a. System Architecture Using AWS Services

The system leverages the following AWS native services to provide a scalable, secure, and serverless API for recurring payment submissions:

- **API Gateway:** Acts as the front door for all API requests.
- **Lambda:** Provides serverless compute for processing payment submissions.
- **DynamoDB:** Serves as the primary NoSQL database for storing payment records.
- **Amazon Cognito:** Handles user authentication and authorization.
- **CloudWatch:** Enables monitoring, logging, and alerting.
- **AWS KMS:** Manages encryption of sensitive data.
- **S3:** Stores monthly reports generated from recurring payments data.
- **SNS:** Sends notifications for processing events (e.g., successful payment submission).

---

### b. Security & Access Management

- **Authentication:** All API access is secured using Amazon Cognito, which issues and validates JWT tokens for users.
- **Authorization:** Fine-grained access control is enforced via IAM roles following the principle of least privilege.
- **Data Protection:** Sensitive data is encrypted at rest using AWS KMS.

---

### c. High Level Operational Plan for 100K Monthly Active Users

#### **Capacity Planning**
- **User Activity:** Estimated 5 submissions per user per month = ~500,000 requests/month (~20 requests/minute at peak).
- **DynamoDB:** Uses on-demand capacity mode to automatically handle variable workloads without manual intervention.
- **Lambda:** Configured concurrency limits to handle expected peaks efficiently.

#### **Monitoring**
- **CloudWatch Alarms:** Set for high error rates, elevated latency, and other critical health indicators.
- **Custom Metrics:** Business KPIs are tracked and visualized in CloudWatch dashboards.

#### **Scaling**
- **API Gateway & Lambda:** Auto-scales to meet request volume, ensuring high availability.
- **DynamoDB:** Uses on-demand capacity or auto-scaling to seamlessly adapt to changing load.

---

