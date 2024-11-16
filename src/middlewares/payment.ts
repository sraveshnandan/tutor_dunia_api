import { NextFunction, Request, Response } from "express";
import { Payment } from "../database/models/payment.model";

export const ValidatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, tutor_id } = req.body
        const payment = await Payment.findOne({ user: user_id, tutor: tutor_id, status: "success" });
        if (!payment) {
            return res.status(400).json({
                success: false,
                message: "Please complete the payment first."
            })
        }
        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}