import { Request, Response } from "express"

const CheckHealth = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            success: true,
            message: "All systems are operational."
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `${error.message}`
        })
    }
}

export { CheckHealth }