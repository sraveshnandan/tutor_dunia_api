"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    desc: { type: String },
    reciver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    is_read: { type: Boolean, default: false }
}, { timestamps: true });
const Notification = (0, mongoose_1.model)("Notification", NotificationSchema);
