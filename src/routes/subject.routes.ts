import { Router } from "express";
import { GetAllSubjects } from "../controllers/subjects.controllers";

const SubjectRouter = Router();
SubjectRouter.route("/subjects").get(GetAllSubjects as any)


export { SubjectRouter };