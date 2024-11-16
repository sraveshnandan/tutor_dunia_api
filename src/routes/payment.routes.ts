import { Router } from "express";
import { CreatePaymentOrder, GetAllPayments, VerifyPayment } from "../controllers/payment.controllers";
import { Authenticate } from "../middlewares/auth";

const PaymentRouter = Router();


PaymentRouter.route("/payment/create").post(Authenticate as any, CreatePaymentOrder as any);
PaymentRouter.route("/payment/verify").post(Authenticate as any, VerifyPayment as any);
PaymentRouter.route("/payments").get(Authenticate as any, GetAllPayments as any);

export { PaymentRouter }