import { Router } from "express";
import { CreateTutor, FetchTutorProfile, GetAllTutors, LoginTutor, UpdateTutorProfile } from "../controllers/tutor.controllers";
import { Authenticate, AuthenticateTutor } from "../middlewares/auth";

const TutorRouter = Router();

TutorRouter.route("/tutor/sign-up").post(CreateTutor as any);
TutorRouter.route("/tutor/sign-in").post(LoginTutor as any);
TutorRouter.route("/tutor/profile").post(AuthenticateTutor as any, FetchTutorProfile as any);
TutorRouter.route("/tutor/update").post(AuthenticateTutor as any, UpdateTutorProfile as any);
TutorRouter.route("/tutors").get(GetAllTutors as any);


export { TutorRouter }