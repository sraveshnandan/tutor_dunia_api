import { Router } from "express";
import { CreateUser, FetchUserProfile, LoginUser, RefreshToken, SendOTP, UpdateUserProfile, VerifyOTp } from "../controllers/user.conrollers";
import { Authenticate } from "../middlewares/auth";

const UserRouter = Router();

UserRouter.route("/user/sign-up").post(CreateUser as any);
UserRouter.route("/send-otp").post(SendOTP);
UserRouter.route("/verify-otp").post(VerifyOTp as any);
UserRouter.route("/user/sign-in").post(LoginUser as any);
UserRouter.route("/user/profile").get(Authenticate as any, FetchUserProfile as any);
UserRouter.route("/user/update").patch(Authenticate as any, UpdateUserProfile as any);
UserRouter.route("/refresh-token").get(RefreshToken as any);


export { UserRouter }