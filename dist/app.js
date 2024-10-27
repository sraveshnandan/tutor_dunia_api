"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const tutor_routes_1 = __importDefault(require("./routes/tutor.routes"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const app = (0, express_1.default)();
exports.app = app;
// middlewares 
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
// api routes 
app.use("/api/v1", user_routes_1.default, tutor_routes_1.default, health_routes_1.default);
