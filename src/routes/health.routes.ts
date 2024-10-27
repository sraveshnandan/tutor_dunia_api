import { Router } from "express";
import { CheckHealth } from "../controllers/health.controllers";

const router = Router();
router.route("/health").get(CheckHealth as any)


export default router;