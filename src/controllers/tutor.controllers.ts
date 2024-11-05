import { Request, Response } from "express";
import { Tutor } from "../database/models/tutor.model";
import { GenerateTokens } from "../utils/token_service";
import { compareSync } from "bcrypt";

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
export const LoginTutor = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const tutor = await Tutor.findOne({ email }).select("+password");
        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "No Account found."
            })
        }

        const isPassOk = compareSync(password, tutor.password);
        if (!isPassOk) {
            return res.status(401).json({
                success: false,
                message: "Invalid Crediential"
            })
        }


        const { access_token, refresh_token } = GenerateTokens(tutor);


        return res.status(201).json({
            success: true,
            message: "Logged in Successfully.",
            access_token,
            refresh_token,
            user: tutor
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `${error.message}`
        })
    }
}
export const FetchTutorProfile = async (req: Request | any, res: Response) => {
    try {
        const user = await Tutor.findById(req.user);
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
export const UpdateTutorProfile = async (req: Request | any, res: Response) => {
    try {
        const user = await Tutor.findByIdAndUpdate({ _id: req.user }, { ...req.body }, { new: true, upsert: true });
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


export const GetAllTutors = async (req: Request, res: Response) => {
    try {
        const { limit, id, category, subject, name } = req.query;
        let query: any = {};
        if (id) {
            query._id = id
        }
        if (category) {
            const categoriesArray = typeof category === 'string' ? category.split(',') : [category];
            query.categories = { $in: categoriesArray }
        }
        if (subject) {
            const subjectsArray = typeof subject === 'string' ? subject.split(',') : [subject];
            query.subjects = { $in: subjectsArray }
        }
        if (name) {
            query.name = { $regex: name, $options: "i" };
        }
        const tutors = await Tutor.find(query).limit(Number(limit) || 10).sort({ createdAt: -1 });
        if (!tutors.length) {
            return res.status(200).json({
                success: false,
                message: "No Result Found."
            })
        }

        return res.status(200).json({
            success: true,
            tutors,
            message: "Tutors fetched successfully."
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}