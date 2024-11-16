import express from "express";
import cors from "cors";
import {
    CategoryRouter
    , FCMRouter,
    HealthRouter,
    PaymentRouter,
    SessionRouter,
    SubjectRouter,
    TutorRouter,
    UserRouter
} from "./routes/routes";
const app = express();



// middlewares 
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));


// api routes 
app.use("/api/v1",
    UserRouter,
    TutorRouter,
    HealthRouter,
    CategoryRouter,
    SessionRouter,
    SubjectRouter,
    PaymentRouter,
    FCMRouter
);



export { app }