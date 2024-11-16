import { model, Schema } from "mongoose";

const SessionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: "Tutor",
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "published", "live", "completed"],
        default: "pending"
    },
    starts_at: {
        type: Date,
        required: true
    },
    is_free: {
        type: Boolean,
        default: false,
    },
    max_user: {
        type: Number,
        default: 10
    },
    price: {
        type: Number
    },
    join_url: String,
    room_id: String,
    duration: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Session = model("Session", SessionSchema);

export { Session }