"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_controllers_1 = require("../controllers/health.controllers");
const router = (0, express_1.Router)();
router.route("/health").get(health_controllers_1.CheckHealth);
exports.default = router;
