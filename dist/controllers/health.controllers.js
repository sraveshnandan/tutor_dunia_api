"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckHealth = void 0;
const CheckHealth = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "All systems are operational."
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}`
        });
    }
};
exports.CheckHealth = CheckHealth;
