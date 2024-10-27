"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOtp = exports.sendOtp = void 0;
const axios_1 = __importDefault(require("axios"));
const credientials_1 = require("../config/credientials");
const sendOtp = async (number) => {
    try {
        const res = await axios_1.default.post(`https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=${credientials_1.SMS_GAITWAY_CUSTOMER_ID}&flowType=SMS&mobileNumber=${number}`, {}, {
            headers: {
                authToken: credientials_1.SMS_GAITWAY_AUTH_TOKEN
            }
        });
        console.log(`OTP successfully sent to +91 ${number}`);
        return res.data;
    }
    catch (error) {
        console.log("otp error", error);
        return null;
    }
};
exports.sendOtp = sendOtp;
const VerifyOtp = async (phone_number, otp, verification_id) => {
    try {
        const res = await axios_1.default.get(`https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=91&mobileNumber=${phone_number}&verificationId=${verification_id}&customerId=${credientials_1.SMS_GAITWAY_CUSTOMER_ID}&code=${otp}`, {
            headers: {
                authToken: credientials_1.SMS_GAITWAY_AUTH_TOKEN
            }
        });
        console.log(`OTP verified successfully.`);
        return res.data;
    }
    catch (error) {
        console.log("otp error", error);
        return null;
    }
};
exports.VerifyOtp = VerifyOtp;
