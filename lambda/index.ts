import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = process.env.TABLE_NAME!;

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body ?? "{}");
    const { amount, currency, description } = body;

    const claims = event.requestContext.authorizer?.claims;
    const userId = claims?.sub;
    if (!userId) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const paymentId = `pay_${Date.now()}`;

    const item = {
      paymentId: { S: paymentId },
      userId: { S: userId },
      amount: { N: amount.toString() },
      currency: { S: currency },
      description: { S: description },
      timestamp: { S: new Date().toISOString() },
    };

    await client.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        paymentId,
        message: "Payment recorded successfully.",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        error: (err as Error).message,
      }),
    };
  }
};
