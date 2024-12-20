const express = require('express');
const router = express.Router();
const notificationsRouter = require("./notifications.routes.js");
const sessionRouter = require("./session.routes.js");
const consultaRouter = require("./consultas.routes.js");
const patientRouter = require("./patient.routes.js");
const doctorRouter = require("./doctor.routes.js");
const medicalHistoryRouter = require("./medicalHistory.routes.js");
const recipesRouter = require("./recipe.routes.js");
const adminRouter = require('./admin.routes.js')

router.use("/session", sessionRouter);
router.use("/notifications", notificationsRouter);
router.use('/consultas', consultaRouter);
router.use('/patients', patientRouter);
router.use('/doctor', doctorRouter);
router.use("/medicalHistory",medicalHistoryRouter);
router.use("/recipes", recipesRouter)
router.use("/admin", adminRouter)

module.exports = router;