"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.BaseUseSchema = void 0;
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const BaseUseSchema = new mongoose_1.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "Email already exists."]
    },
    avatar: {
        public_id: String,
        url: String
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    email_verification: {
        otp: Number,
        expiry: Date
    },
});
exports.BaseUseSchema = BaseUseSchema;
const UserSchema = new mongoose_1.Schema({
    ...BaseUseSchema.obj,
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least of 6 characters."],
        select: false
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        minlength: [10, "Phone number at least of 10 digit."]
    },
    phone_verified: {
        type: Boolean,
        default: false
    },
    phone_verification: {
        otp: Number,
        expiry: Date
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = (0, bcrypt_1.hashSync)(this.password, 10);
        next();
    }
    next();
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.User = User;
