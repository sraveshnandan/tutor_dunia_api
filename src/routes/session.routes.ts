import { Router } from "express";
import { BookSession, CreateSession, GetSessions, UpdateSession } from "../controllers/session.controllers";
import { ValidatePayment } from "../middlewares/payment";

const SessionRouter = Router();

SessionRouter.route("/session/create").post(CreateSession as any);
SessionRouter.route("/sessions").get(GetSessions as any);
SessionRouter.route("/session/update").put(UpdateSession as any);
SessionRouter.route("/session/book").post(ValidatePayment as any, BookSession as any);



export { SessionRouter };