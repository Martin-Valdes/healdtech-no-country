const express = require('express');
const router = express.Router();
const medicalHistoryController = require('../controllers/medicalHistory.controller.js');
const authorization = require("../middlewares/authorization.middleware.js");
const checkToken = require('../middlewares/checkTocken.middleware.js');

/**
 * @openapi
 * /healdtech/medicalHistory:
 *   get:
 *     tags:
 *       - MedicalHistory
 *     summary: Get all medical history
 *     responses:
 *       200:
 *         description: Return all medical history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 medicalBackground:
 *                   type: string
 *                   description: Medical Background
 *                   example: Medical Background
 *                 epidemiological:
 *                   type: string
 *                   description: Epidemiological
 *                   example: Epidemiological
 *                 toxicHabits:
 *                   type: string
 *                   description: Toxic Habits
 *                   example: Toxic Habits
 *                 medicalProcedures:
 *                   type: string
 *                   description: Medical Procedures
 *                   example: Medical Procedures
 *                 diseases:
 *                   type: string
 *                   description: Diseases
 *                   example: Diseases
 *                 medications:
 *                   type: string
 *                   description: Medications
 *                   example: Medications
 *                 familyHistory:
 *                   type: string
 *                   description: Family History
 *                   example: Family History
 *                 epicrisis:
 *                   type: string
 *                   description: Epicrisis
 *                   example: Epicrisis
 *                 patientId:
 *                   type: string
 *                   description: Patient id
 *                   example: 1
 *                 consultationId:
 *                   type: string
 *                   description: Consultation id
 *                   example: 1
 */
router.get('/', checkToken, authorization("admin"), medicalHistoryController.getAllMedicalHistory);
/**
 * @openapi
 *   /healdtech/medicalHistory/{id}:
 *     get:
 *       tags:
 *         - MedicalHistory
 *       summary: Get Medical History by id
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Medical History id
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   medicalBackground:
 *                     type: string
 *                     description: Medical Background
 *                     example: Medical Background
 *                   epidemiological:
 *                     type: string
 *                     description: Epidemiological
 *                     example: Epidemiological
 *                   toxicHabits:
 *                     type: string
 *                     description: Toxic Habits
 *                     example: Toxic Habits
 *                   medicalProcedures:
 *                     type: string
 *                     description: Medical Procedures
 *                     example: Medical Procedures
 *                   diseases:
 *                     type: string
 *                     description: Diseases
 *                     example: Diseases
 *                   medications:
 *                     type: string
 *                     description: Medications
 *                     example: Medications
 *                   familyHistory:
 *                     type: string
 *                     description: Family History
 *                     example: Family History
 *                   epicrisis:
 *                     type: string
 *                     description: Epicrisis
 *                     example: Epicrisis
 *                   patientId:
 *                     type: string
 *                     description: Patient id
 *                     example: 1
 *                   consultationId:
 *                     type: string
 *                     description: Consultation id
 *                     example: 1
 */
router.get('/:id', checkToken, authorization("admin", "doctor"), medicalHistoryController.getMedicalHistroyById);
/**
 * @openapi
 *   /healdtech/medicalHistory/patientId/{id}:
 *     get:
 *       tags:
 *         - MedicalHistory
 *       summary: Get Medical History by patient id
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *             example: 13142-3432dasd-314dasd
 *           description: Patient id
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   medicalBackground:
 *                     type: string
 *                     description: Medical Background
 *                     example: Medical Background
 *                   epidemiological:
 *                     type: string
 *                     description: Epidemiological
 *                     example: Epidemiological
 *                   toxicHabits:
 *                     type: string
 *                     description: Toxic Habits
 *                     example: Toxic Habits
 *                   medicalProcedures:
 *                     type: string
 *                     description: Medical Procedures
 *                     example: Medical Procedures
 *                   diseases:
 *                     type: string
 *                     description: Diseases
 *                     example: Diseases
 *                   medications:
 *                     type: string
 *                     description: Medications
 *                     example: Medications
 *                   familyHistory:
 *                     type: string
 *                     description: Family History
 *                     example: Family History
 *                   epicrisis:
 *                     type: string
 *                     description: Epicrisis
 *                     example: Epicrisis
 *                   patientId:
 *                     type: string
 *                     description: Patient id
 *                     example: 1
 *                   consultationId:
 *                     type: string
 *                     description: Consultation id
 *                     example: 1
 */
router.get('/patientId/:patientId', checkToken, authorization("admin", "user", "doctor"), medicalHistoryController.getMedicalHistoryByUser);
/**
 * @openapi
 * /healdtech/medicalHistory:
 *  post:
 *    tags:
 *      - MedicalHistory
 *    summary: Create a new medical history
 *    description: Create a new medical history
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              medicalBackground:
 *                type: string
 *                description: Medical Background
 *                example: Medical Background
 *              epidemiological:
 *                type: string
 *                description: Epidemiological
 *                example: Epidemiological
 *              toxicHabits:
 *                type: string
 *                description: Toxic Habits
 *                example: Toxic Habits
 *              medicalProcedures:
 *                type: string
 *                description: Medical Procedures
 *                example: Medical Procedures
 *              diseases:
 *                type: string
 *                description: Diseases
 *                example: Diseases
 *              medications:
 *                type: string
 *                description: Medications
 *                example: Medications
 *              familyHistory:
 *                type: string
 *                description: Family History
 *                example: Family History
 *              epicrisis:
 *                type: string
 *                description: Epicrisis
 *                example: Epicrisis
 *              patientId:
 *                type: string
 *                description: Patient id
 *                example: 1
 *              consultationId:
 *                type: string
 *                description: Consultation id
 *                example: 1
 *    responses:
 *      200:
 *        description: medical history created
 */
router.post('/', checkToken, authorization("doctor"), medicalHistoryController.createMedicalHistory);
/**
 * @openapi
 * /healdtech/medicalHistory/{id}:
 *   delete:
 *     tags:
 *       - MedicalHistory
 *     summary: Delete medical history by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The id of the medical history to delete
 *           example: 213njlk4234-asd3244-342fasdfdas
 *         description: The id of the medical history to delete
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The id of the medical history
 *                   example: 213njlk4234-asd3244-342fasdfdas
 */
router.delete('/:id', checkToken, authorization("admin"), medicalHistoryController.deleteMedicalHistoryById);

module.exports = router;