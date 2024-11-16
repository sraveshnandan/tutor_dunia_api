import { Router } from "express";
import { CheckHealth } from "../controllers/health.controllers";

const HealthRouter = Router();
HealthRouter.route("/health").get(CheckHealth as any)


export { HealthRouter };