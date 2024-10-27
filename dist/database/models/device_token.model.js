"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceToken = void 0;
const mongoose_1 = require("mongoose");
const DeviceTokenSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    tokens: [
        { type: String }
    ]
}, { timestamps: true });
const DeviceToken = (0, mongoose_1.model)("DeviceToken", DeviceTokenSchema);
exports.DeviceToken = DeviceToken;
