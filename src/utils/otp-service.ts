import axios from "axios";
import { SMS_GAITWAY_AUTH_TOKEN, SMS_GAITWAY_CUSTOMER_ID } from "../config/credientials";

const sendOtp = async (number: number) => {
    try {
        const res = await axios.post(`https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=${SMS_GAITWAY_CUSTOMER_ID}&flowType=SMS&mobileNumber=${number}`, {}, {
            headers: {
                authToken: SMS_GAITWAY_AUTH_TOKEN!
            }
        });
        console.log(`OTP successfully sent to +91 ${number}`);
        return res.data;
    } catch (error) {
        console.log("otp error", error);
        return null
    }
}


const VerifyOtp = async (phone_number: number, otp: number, verification_id: number) => {
    try {
        const res = await axios.get(`https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=91&mobileNumber=${phone_number}&verificationId=${verification_id}&customerId=${SMS_GAITWAY_CUSTOMER_ID}&code=${otp}`, {
            headers: {
                authToken: SMS_GAITWAY_AUTH_TOKEN!
            }
        });
        console.log(`OTP verified successfully.`);
        return res.data;
    } catch (error) {
        console.log("otp error", error);
        return null
    }
}




export { sendOtp, VerifyOtp }