"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTutor = void 0;
const tutor_model_1 = require("../database/models/tutor.model");
const token_service_1 = require("../utils/token_service");
const CreateTutor = async (req, res) => {
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
        };
        const tutor = await tutor_model_1.Tutor.create(newTutorPayload);
        const { access_token, refresh_token } = (0, token_service_1.GenerateTokens)(tutor);
        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            access_token,
            refresh_token,
            tutor
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `${error.message}`
        });
    }
};
exports.CreateTutor = CreateTutor;
