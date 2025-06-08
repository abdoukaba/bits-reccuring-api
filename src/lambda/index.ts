// lambda/index.ts
import { APIGatewayProxyHandler } from "aws-lambda";
import { handlePayment } from "../controllers/paymentController";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body ?? "{}");
    const claims = event.requestContext.authorizer?.claims;
    const userId = claims?.sub;

    if (!userId) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    return await handlePayment(body, userId);
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
