// src/utils/validationService.ts
import { validate as uuidValidate, version as uuidVersion } from "uuid";

export function validatePayment(payment: any): string | null {
  if (!payment.paymentId || typeof payment.paymentId !== "string" || !uuidValidate(payment.paymentId) || uuidVersion(payment.paymentId) !== 4) {
    return "Invalid or missing 'paymentId' (must be UUID v4)";
  }
  if (!payment.userId || typeof payment.userId !== "string" || !uuidValidate(payment.userId) || uuidVersion(payment.userId) !== 4) {
    return "Invalid or missing 'userId' (must be UUID v4)";
  }
  if (!payment.timestamp || isNaN(Date.parse(payment.timestamp))) {
    return "Invalid or missing 'timestamp'";
  }
  if (!payment.amount || typeof payment.amount !== "number" || payment.amount <= 0) {
    return "Invalid or missing 'amount'";
  }
  if (!payment.currency || typeof payment.currency !== "string") {
    return "Invalid or missing 'currency'";
  }
  if (!payment.description || typeof payment.description !== "string") {
    return "Invalid or missing 'description'";
  }
  return null;
}
