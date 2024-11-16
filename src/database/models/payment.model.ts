import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    order_id: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: "Tutor",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    }
}, { timestamps: true })


export const Payment = model("Payment", paymentSchema);