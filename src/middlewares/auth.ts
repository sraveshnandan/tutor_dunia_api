import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/credientials";
import { User } from "../database/models/user.model";
export const Authenticate = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication needed."
            })
        }

        const decoded: any = jwt.verify(token as string, ACCESS_TOKEN_SECRET!);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Token expired."
            })
        }
        const user = await User.findById(decoded?.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid Token or expired."
            })
        };

        req.user = user._id;
        next()
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Invalid or expired token."
        })
    }
}