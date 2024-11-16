import { Request, Response } from "express";
import { Tutor } from "../database/models/tutor.model";
import { razorpayClient } from "../lib/razorpay";
import { Payment } from "../database/models/payment.model";
import { User } from "../database/models/user.model";
import crypto from "crypto"
import { RAZORPAY_KEY_SECRET } from "../config/credientials";

export const CreatePaymentOrder = async (req: Request | any, res: Response) => {
    try {
        const { tutor_id } = req.body;
        const user_id = req.user;

        const tutor = await Tutor.findById(tutor_id);
        const existingPayment = await Payment.findOne({ tutor: tutor_id, user: user_id, status: "pending" });

        if (existingPayment) {
            return res.status(200).json({ message: "Payment already exists", success: true, payment: existingPayment })
        }
        if (!tutor) {
            return res.status(404).json({ message: "Tutor not found" })
        }
        const amount = tutor.monthly_rate;



        const order = await razorpayClient.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt#${Math.floor(Math.random() * 1000)}`,
            notes: {
                tutor_id,
                user_id
            }
        });

        if (!order) {
            return res.status(500).json({ message: "Error while creating order", success: false })
        }

        const payment = await Payment.create({
            order_id: order.id,
            user: user_id,
            tutor: tutor_id,
            amount: amount,
            status: "pending"
        })

        return res.status(200).json({ message: "Payment order created", order, payment, success: true })


    } catch (error) {
        console.log("err while creating payment order", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const VerifyPayment = async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const payment = await Payment.findOne({ order_id: razorpay_order_id });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" })
        }

        const tutor = await Tutor.findById(payment.tutor);
        if (!tutor) {
            return res.status(404).json({ message: "Tutor not found" })
        }

        const user = await User.findById(payment.user);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");


        const isPaymentVerified = expectedSignature === razorpay_signature;

        if (!isPaymentVerified) {
            return res.status(500).json({ message: "Error while verifying payment", success: false })
        }

        payment.status = "success";
        await payment.save();
        return res.status(200).json({ message: "Payment verified", success: true })

    } catch (error) {
        console.log("err while verifying payment", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const GetAllPayments = async (req: Request | any, res: Response) => {
    try {
        const { tutor_id, limit } = req.query;
        const user_id = req.user;
        let filter = {}
        if (user_id) {
            filter = { user: user_id }
        }

        if (tutor_id) {
            filter = { tutor: tutor_id }
        }
        const payments = await Payment.find(filter).populate("tutor", "full_name email avatar").sort({ createdAt: -1 }).limit(Number(limit) || 10)
        if (!payments.length) {
            return res.status(404).json({ message: "Payments not found" })
        }
        return res.status(200).json({ message: "Payments fetched", payments, success: true })
    } catch (error) {
        console.log("err while fetching payments", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}