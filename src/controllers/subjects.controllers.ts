import { Request, Response } from "express";
import { Subject } from "../database/models/subject.model";

export const GetAllSubjects = async (req: Request, res: Response) => {
    try {
        const { limit, id } = req.query;
        let query = {};
        if (id) {
            query = { _id: id }
        }
        const subjects = await Subject.find(query).limit(Number(limit)).sort({ createdAt: -1 });
        if (!subjects.length) {
            return res.status(200).json({
                success: false,
                message: "No such subject or subjects found."
            })
        }

        return res.status(200).json({
            success: true,
            subjects,
            message: "Category fetched successfully."
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}