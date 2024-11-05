import { Router } from "express";
import { GetAllSubjects } from "../controllers/subjects.controllers";

const router = Router();
router.route("/subjects").get(GetAllSubjects as any)


export default router;