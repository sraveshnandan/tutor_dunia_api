
import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/credientials"
export const GenerateTokens = (user: any) => {
    const access_token = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET!, {
        expiresIn: "7d"
    });
    const refresh_token = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET!, {
        expiresIn: "1d"
    });

    return { refresh_token, access_token }
}