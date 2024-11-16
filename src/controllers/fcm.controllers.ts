import { Request, Response } from "express";
import { DeviceToken } from "../database/models/device_token.model";

export const AddFCMToken = async (req: Request | any, res: Response) => {
    try {
        const { fcmToken } = req.body;
        const user = req.user;
        if (!fcmToken) {
            return res.status(400).json({
                success: false,
                message: "fcmToken is required"
            })
        }
        let deviceToken = await DeviceToken.findOne({ user: user._id });
        if (!deviceToken) {
            deviceToken = new DeviceToken({
                user: user._id,
                tokens: [fcmToken]
            })
            await deviceToken.save();
        } else {
            deviceToken.tokens.push(fcmToken);
            await deviceToken.save();
        }
        return res.status(200).json({
            success: true,
            message: "fcmToken added successfully"
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}