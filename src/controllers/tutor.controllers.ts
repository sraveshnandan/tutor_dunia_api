import { Request, Response } from "express";
import { Tutor } from "../database/models/tutor.model";
import { GenerateTokens } from "../utils/token_service";

export const CreateTutor = async (req: Request, res: Response) => {
    try {

        const { full_name, email, password, qualification, categories, monthly_rate, address } = req.body;

        let newTutorPayload = {
            full_name,
            email,
            password,
            qualification,
            categories,
            monthly_rate,
            address,
        }

        const tutor = await Tutor.create(newTutorPayload);


        const { access_token, refresh_token } = GenerateTokens(tutor);


        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            access_token,
            refresh_token,
            tutor
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `${error.message}`
        })
    }
}