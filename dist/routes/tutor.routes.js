"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutor_controllers_1 = require("../controllers/tutor.controllers");
const router = (0, express_1.Router)();
router.route("/tutor/sign-up").post(tutor_controllers_1.CreateTutor);
router.route("/tutor/sign-in").post(tutor_controllers_1.CreateTutor);
exports.default = router;
