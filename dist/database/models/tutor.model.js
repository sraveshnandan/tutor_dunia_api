"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutor = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const bcrypt_1 = require("bcrypt");
const TutorSchema = new mongoose_1.Schema({
    ...user_model_1.BaseUseSchema.obj,
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least of 6 characters."],
        select: false
    },
    bio: {
        type: String,
    },
    categories: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Category"
        }],
    address: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true,
    },
    qualification_doc: {
        public_id: String,
        url: String
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    subjects: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Subject"
        },
    ],
    monthly_rate: {
        type: Number,
        default: 999
    },
    demo_video: {
        public_id: String,
        url: String
    },
    exp: {
        type: Number,
        default: 1
    },
    reviews: {
        star: {
            type: Number,
            default: 0
        },
        message: String,
        user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
    },
    ratings: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
TutorSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = (0, bcrypt_1.hashSync)(this.password, 10);
        next();
    }
    next();
});
const Tutor = (0, mongoose_1.model)("Tutor", TutorSchema);
exports.Tutor = Tutor;
