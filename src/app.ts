import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import tutorRoutes from "./routes/tutor.routes";
import healthRoutes from "./routes/health.routes";
import categoryRoutes from "./routes/category.routes";
import subjectRoutes from "./routes/subject.routes";
import sessionRoutes from "./routes/session.routes"
const app = express();



// middlewares 
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));


// api routes 
app.use("/api/v1", userRoutes, tutorRoutes, healthRoutes, categoryRoutes, sessionRoutes, subjectRoutes);



export { app }