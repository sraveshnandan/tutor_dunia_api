"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = exports.UpdateUserProfile = exports.FetchUserProfile = exports.LoginUser = exports.CreateUser = exports.VerifyOTp = exports.SendOTP = void 0;
const otp_service_1 = require("../utils/otp-service");
const user_model_1 = require("../database/models/user.model");
const token_service_1 = require("../utils/token_service");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credientials_1 = require("../config/credientials");
const SendOTP = async (req, res) => {
    try {
        console.log("working");
        const { phone_number } = req.body;
        if (!phone_number) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required."
            });
        }
        const otp_res = await (0, otp_service_1.sendOtp)(phone_number);
        if (!otp_res) {
            return res.status(501).json({
                success: false,
                message: "Unable to send otp."
            });
        }
        res.status(200).json({
            success: true,
            otp_res,
            message: `Otp sent successfully. on ${phone_number}`
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        });
    }
};
exports.SendOTP = SendOTP;
const VerifyOTp = async (req, res) => {
    try {
        const { phone_number, otp, verification_id } = req.body;
        if (!phone_number || otp || verification_id) {
            return res.status(400).json({
                success: false,
                message: "OTP phone number and Verification Id are required."
            });
        }
        const otp_verify_res = await (0, otp_service_1.VerifyOtp)(phone_number, otp, verification_id);
        if (!otp_verify_res) {
            return res.status(501).json({
                success: false,
                message: "Invalid otp."
            });
        }
        res.status(200).json({
            success: true,
            message: `Otp Verified successfully.`
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        });
    }
};
exports.VerifyOTp = VerifyOTp;
const CreateUser = async (req, res) => {
    try {
        const { full_name, email, password, phone_number, avatar } = req.body;
        let alreacyExists = await user_model_1.User.findOne({ email });
        if (alreacyExists) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }
        const newUserPayload = {
            full_name,
            email,
            avatar,
            password,
            phone: phone_number,
            phone_verified: true
        };
        let user = await user_model_1.User.create(newUserPayload);
        const { access_token, refresh_token } = (0, token_service_1.GenerateTokens)(user);
        user.password = "";
        res.status(201).json({
            success: true,
            user,
            access_token,
            refresh_token
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        });
    }
};
exports.CreateUser = CreateUser;
const LoginUser = async (req, res) => {
    try {
        const { phone_number, password } = req.body;
        let user = await user_model_1.User.findOne({ phone: phone_number }).select("+password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found."
            });
        }
        const isPassMatched = (0, bcrypt_1.compareSync)(password, user.password);
        if (!isPassMatched) {
            return res.status(409).json({
                success: false,
                message: "Invalid Phone Number or Password."
            });
        }
        const { access_token, refresh_token } = (0, token_service_1.GenerateTokens)(user);
        user.password = "";
        return res.status(200).json({
            success: true,
            user,
            access_token,
            refresh_token,
            message: "Logged in successfully."
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        });
    }
};
exports.LoginUser = LoginUser;
const FetchUserProfile = async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found."
            });
        }
        const { access_token, refresh_token } = (0, token_service_1.GenerateTokens)(user);
        return res.status(200).json({
            success: true,
            user,
            access_token,
            refresh_token,
            message: "User profile Refreshed successfully."
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        });
    }
};
exports.FetchUserProfile = FetchUserProfile;
const UpdateUserProfile = async (req, res) => {
    try {
        const user = await user_model_1.User.findByIdAndUpdate({ _id: req.user }, { ...req.body }, { new: true, upsert: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found."
            });
        }
        const { access_token, refresh_token } = (0, token_service_1.GenerateTokens)(user);
        return res.status(200).json({
            success: true,
            user,
            access_token,
            refresh_token,
            message: "User profile Refreshed successfully."
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        });
    }
};
exports.UpdateUserProfile = UpdateUserProfile;
const RefreshToken = async (req, res) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Refresh Token Needed."
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, credientials_1.REFRESH_TOKEN_SECRET);
        let user = await user_model_1.User.findById(decoded.id);
        if (!decoded && !user) {
            return res.status(400).json({
                success: false,
                message: "Unable to refresh token, please login again."
            });
        }
        const { access_token, refresh_token } = (0, token_service_1.GenerateTokens)(user);
        return res.status(200).json({
            success: true,
            access_token,
            refresh_token,
            message: "Token Refreshed successfully."
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        });
    }
};
exports.RefreshToken = RefreshToken;
