import { Router } from "express";
import { Authenticate } from "../middlewares/auth";
import { AddFCMToken } from "../controllers/fcm.controllers";

const FCMRouter = Router();

FCMRouter.route("/fcm-token").post(Authenticate as any, AddFCMToken as any)

export { FCMRouter }