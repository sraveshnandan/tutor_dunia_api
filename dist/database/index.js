"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const credientials_1 = require("../config/credientials");
const connectDataBase = async (cb) => {
    try {
        const dbres = await mongoose_1.default.connect(credientials_1.MONGO_URI);
        console.log(`Database connected to: ${dbres.connection.host}`);
        cb();
    }
    catch (error) {
        return console.error(`Unable to connect to the database due to : ${error.message}`);
    }
};
exports.connectDataBase = connectDataBase;
