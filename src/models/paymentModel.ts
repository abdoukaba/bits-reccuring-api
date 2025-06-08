// models/paymentModel.ts
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = process.env.TABLE_NAME!;

export async function savePayment(payment: {
  paymentId: string;
  userId: string;
  amount: number;
  currency: string;
  description: string;
  timestamp: string;
}) {
  const item = {
    paymentId: { S: payment.paymentId },
    userId: { S: payment.userId },
    amount: { N: payment.amount.toString() },
    currency: { S: payment.currency },
    description: { S: payment.description },
    timestamp: { S: payment.timestamp },
  };

  await client.send(
    new PutItemCommand({
      TableName: TABLE_NAME,
      Item: item,
    })
  );
}
