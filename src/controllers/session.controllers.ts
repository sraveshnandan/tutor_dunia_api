import { Request, Response } from "express";

export const CreateSession = async (req: Request, res: Response) => {
    try {

        const { } = req.body;

        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal Server error."
        })
    }
}