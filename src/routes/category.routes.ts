import { Router } from "express";
import { GetAllCategory } from "../controllers/category.controller";

const CategoryRouter = Router();
CategoryRouter.route("/category").get(GetAllCategory as any)


export { CategoryRouter };