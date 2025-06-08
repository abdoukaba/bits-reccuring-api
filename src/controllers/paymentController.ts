// controllers/paymentController.ts
import { savePayment } from "../models/paymentModel";

export async function handlePayment(body: any, userId: string) {
  const { amount, currency, description } = body;
  if (!amount || !currency || !description) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }

  const paymentId = `pay_${Date.now()}`;
  const timestamp = new Date().toISOString();

  await savePayment({
    paymentId,
    userId,
    amount,
    currency,
    description,
    timestamp,
  });

  return {
    statusCode: 201,
    body: JSON.stringify({
      paymentId,
      message: "Payment recorded successfully.",
    }),
  };
}
