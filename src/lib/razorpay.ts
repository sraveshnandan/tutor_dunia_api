import Razorpay from "razorpay";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../config/credientials";

export const razorpayClient = new Razorpay({
    key_id: RAZORPAY_KEY_ID as string,
    key_secret: RAZORPAY_KEY_SECRET as string
});