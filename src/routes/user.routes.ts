import { Router } from "express";
import { CreateUser, FetchUserProfile, LoginUser, RefreshToken, SendOTP, UpdateUserProfile, VerifyOTp } from "../controllers/user.conrollers";
import { Authenticate } from "../middlewares/auth";

const router = Router();

router.route("/user/sign-up").post(CreateUser as any);
router.route("/send-otp").post(SendOTP);
router.route("/verify-otp").post(VerifyOTp as any);
router.route("/user/sign-in").post(LoginUser as any);
router.route("/user/profile").get(Authenticate as any, FetchUserProfile as any);
router.route("/user/update").patch(Authenticate as any, UpdateUserProfile as any);
router.route("/refresh-token").get(RefreshToken as any);


export default router