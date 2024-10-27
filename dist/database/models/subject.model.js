"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const mongoose_1 = require("mongoose");
const SubjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        public_id: String,
        url: String
    }
}, { timestamps: true });
const Subject = (0, mongoose_1.model)("Subject", SubjectSchema);
exports.Subject = Subject;
