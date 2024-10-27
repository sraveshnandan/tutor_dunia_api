"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({}, { timestamps: true });
const Session = (0, mongoose_1.model)("Session", SessionSchema);
exports.Session = Session;
