
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI_LOCAL = process.env.MONGO_URi_LOCAL;
const SMS_GAITWAY_URL = process.env.SMS_GAITWAY_URL;
const SMS_GAITWAY_AUTH_TOKEN = process.env.SMS_GAITWAY_AUTH_TOKEN;
const SMS_GAITWAY_CUSTOMER_ID = process.env.SMS_GAITWAY_CUSTOMER_ID;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export {
    PORT,
    MONGO_URI,
    SMS_GAITWAY_URL,
    SMS_GAITWAY_AUTH_TOKEN,
    SMS_GAITWAY_CUSTOMER_ID,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    MONGO_URI_LOCAL
}