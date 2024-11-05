import { Router } from "express";
import { GetAllCategory } from "../controllers/category.controller";

const router = Router();
router.route("/category").get(GetAllCategory as any)


export default router;