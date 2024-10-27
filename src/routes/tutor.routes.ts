import { Router } from "express";
import { CreateTutor } from "../controllers/tutor.controllers";

const router = Router();

router.route("/tutor/sign-up").post(CreateTutor as any);
router.route("/tutor/sign-in").post(CreateTutor as any);


export default router