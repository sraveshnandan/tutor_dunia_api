"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credientials_1 = require("../config/credientials");
const user_model_1 = require("../database/models/user.model");
const Authenticate = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication needed."
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, credientials_1.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Token expired."
            });
        }
        const user = await user_model_1.User.findById(decoded?.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid Token or expired."
            });
        }
        ;
        req.user = user._id;
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};
exports.Authenticate = Authenticate;
