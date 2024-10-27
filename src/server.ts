import { app } from "./app";
import express from "express"
import { PORT } from "./config/credientials";
import { connectDataBase } from "./database";


// starting the server 
connectDataBase(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: http://127.0.0.1:${PORT}`)
    });
})
