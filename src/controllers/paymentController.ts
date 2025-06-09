import { savePayment } from "../models/paymentModel";
import { validatePayment } from "../utils/validationService";

export async function handlePayment(body: any) {
  const validationError = validatePayment(body);
  if (validationError) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: validationError }),
    };
  }

  await savePayment(body);

  return {
    statusCode: 201,
    body: JSON.stringify({
      paymentId: body.paymentId,
      message: "Payment recorded successfully.",
    }),
  };
}
