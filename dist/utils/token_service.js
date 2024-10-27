"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credientials_1 = require("../config/credientials");
const GenerateTokens = (user) => {
    const access_token = jsonwebtoken_1.default.sign({ id: user._id }, credientials_1.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d"
    });
    const refresh_token = jsonwebtoken_1.default.sign({ id: user._id }, credientials_1.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d"
    });
    return { refresh_token, access_token };
};
exports.GenerateTokens = GenerateTokens;
