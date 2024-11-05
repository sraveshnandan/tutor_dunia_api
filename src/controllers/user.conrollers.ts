import { Request, Response } from "express";
import { sendOtp, VerifyOtp } from "../utils/otp-service";
import { User } from "../database/models/user.model";
import { GenerateTokens } from "../utils/token_service";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config/credientials";

export const SendOTP = async (req: any, res: any) => {
    try {
        console.log("working")
        const { phone_number } = req.body;
        if (!phone_number) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required."
            })
        }
        const otp_res = await sendOtp(phone_number);
        if (!otp_res) {
            return res.status(501).json({
                success: false,
                message: "Unable to send otp."
            })
        }
        res.status(200).json({
            success: true,
            otp_res,
            message: `Otp sent successfully. on ${phone_number}`
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        })
    }
}

export const VerifyOTp = async (req: Request, res: Response) => {
    try {
        const { phone_number, otp, verification_id } = req.body;
        // if (!phone_number. && !otp && !verification_id) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "OTP phone number and Verification Id are required."
        //     })
        // }
        const otp_verify_res = await VerifyOtp(phone_number, otp, verification_id);
        if (!otp_verify_res) {
            return res.status(501).json({
                success: false,
                message: "Invalid otp."
            })
        }
        res.status(200).json({
            success: true,
            message: `Otp Verified successfully.`
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        })
    }
}


export const CreateUser = async (req: Request, res: Response) => {
    try {
        const { full_name, email, password, phone_number, avatar } = req.body;
        let alreacyExists = await User.findOne({ email });
        if (alreacyExists) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            })
        }
        const newUserPayload = {
            full_name,
            email,
            avatar,
            password,
            phone: phone_number,
            phone_verified: true
        };

        let user = await User.create(newUserPayload);

        const { access_token, refresh_token } = GenerateTokens(user);
        user.password = "";

        res.status(201).json({
            success: true,
            user,
            access_token,
            refresh_token
        })

    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        })
    }
};

export const LoginUser = async (req: Request, res: Response | any) => {
    try {
        const { phone_number, password } = req.body;
        let user = await User.findOne({ phone: phone_number }).select("+password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found."
            })
        }

        const isPassMatched = compareSync(password, user.password);
        if (!isPassMatched) {
            return res.status(409).json({
                success: false,
                message: "Invalid Phone Number or Password."
            })
        }
        const { access_token, refresh_token } = GenerateTokens(user);
        user.password = "";
        return res.status(200).json({
            success: true,
            user,
            access_token,
            refresh_token,
            message: "Logged in successfully."
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        })
    }
};


export const FetchUserProfile = async (req: Request | any, res: Response) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found."
            })
        }


        const { access_token, refresh_token } = GenerateTokens(user);

        return res.status(200).json({
            success: true,
            user,
            access_token,
            refresh_token,
            message: "User profile Refreshed successfully."
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        })
    }
}
export const UpdateUserProfile = async (req: Request | any, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.user }, { ...req.body }, { new: true, upsert: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found."
            })
        }


        const { access_token, refresh_token } = GenerateTokens(user);

        return res.status(200).json({
            success: true,
            user,
            access_token,
            refresh_token,
            message: "User profile Refreshed successfully."
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        })
    }
}


export const RefreshToken = async (req: Request | any, res: Response) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Refresh Token Needed."
            })
        }
        const decoded: any = jwt.verify(token, REFRESH_TOKEN_SECRET!)
        let user = await User.findById(decoded.id);

        if (!decoded && !user) {
            return res.status(400).json({
                success: false,
                message: "Unable to refresh token, please login again."
            })
        }

        const { access_token, refresh_token } = GenerateTokens(user);

        return res.status(200).json({
            success: true,
            access_token,
            refresh_token,
            message: "Token Refreshed successfully."
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: `${error.message}`
        })
    }
}

