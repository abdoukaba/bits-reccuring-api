import { APIGatewayProxyHandler } from "aws-lambda";
import { handlePayment } from "../controllers/paymentController";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body ?? "{}");
    return await handlePayment(body);
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
