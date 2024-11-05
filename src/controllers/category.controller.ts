import { Request, Response } from "express";
import { Category } from "../database/models/category.model";

export const GetAllCategory = async (req: Request, res: Response) => {
    try {
        const { limit, id } = req.query;
        let query = {};
        if (id) {
            query = { _id: id }
        }
        const categories = await Category.find(query).limit(Number(limit)).sort({ createdAt: -1 });
        if (!categories.length) {
            return res.status(200).json({
                success: false,
                message: "No such category or categories found."
            })
        }

        return res.status(200).json({
            success: true,
            categories,
            message: "Category fetched successfully."
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}