"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const credientials_1 = require("./config/credientials");
const database_1 = require("./database");
// starting the server 
(0, database_1.connectDataBase)(() => {
    app_1.app.listen(credientials_1.PORT, () => {
        console.log(`Server is running on port: http://127.0.0.1:${credientials_1.PORT}`);
    });
});
