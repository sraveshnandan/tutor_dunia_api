import { Router } from "express";
import { CreateTutor, FetchTutorProfile, GetAllTutors, LoginTutor, UpdateTutorProfile } from "../controllers/tutor.controllers";
import { Authenticate } from "../middlewares/auth";

const router = Router();

router.route("/tutor/sign-up").post(CreateTutor as any);
router.route("/tutor/sign-in").post(LoginTutor as any);
router.route("/tutor/profile").post(Authenticate as any, FetchTutorProfile as any);
router.route("/tutor/update").post(Authenticate as any, UpdateTutorProfile as any);
router.route("/tutors").get(GetAllTutors as any);


export default router