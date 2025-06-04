import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { paymentId, userId, timestamp, description, currency, amount } = body;

    if (!paymentId || !userId || !timestamp || !description || !currency || amount == null) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Missing required fields' }) };
    }

    const command = new PutItemCommand({
      TableName: process.env.TABLE_NAME!,
      Item: {
        paymentId: { S: paymentId },
        userId: { S: userId },
        timestamp: { S: timestamp },
        description: { S: description },
        currency: { S: currency },
        amount: { N: amount.toString() },
      },
    });

    await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Payment recorded' }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal server error' }) };
  }
};
