const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const authorization = require("../middlewares/authorization.middleware.js");
const checkToken = require('../middlewares/checkTocken.middleware.js');

/**
 * @openapi
 * /healdtech/patients:
 *  post:
 *    tags:
 *      - Patient
 *    summary: Create a new patient
 *    description: Create a new patient
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Miguel"
 *                description: The name of the patient
 *              rol:
 *                type: string
 *                example: "patient"
 *                description: The role of the patient
 *              age:
 *                type: integer
 *                example: 20
 *                description: The age of the patient
 *              email:
 *                type: string
 *                example: "miguel@mail.com"
 *                description: The email of the patient
 *              password:
 *                type: string
 *                example: "123456"
 *                description: The password of the patient
 *              dateBirth:
 *                type: string
 *                example: "11/30/2001"
 *                description: The date of birth of the patient
 *              address:
 *                type: string
 *                example: "Calle 123"
 *                description: The address of the patient
 *              phone:
 *                type: integer
 *                example: 123456789
 *                description: The phone of the patient
 *    responses:
 *      200:
 *        description: Patient created
 */
router.post('/',checkToken, authorization("admin", "user") , patientController.createPatient);

/**
 * @openapi
 * /healdtech/patients/{id}:
 *  patch:
 *    tags:
 *      - Patient
 *    summary: Update patient
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 21432irojfew213
 *        description: The patient's id.
 *        example: 21432irojfew213
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              rol:
 *                type: string
 *                example: "patient"
 *                description: The role of the patient
 *              name:
 *                type: string
 *                example: "Miguel"
 *                description: The name of the patient
 *              age:
 *                type: integer
 *                example: 21
 *                description: The age of the patient
 *              email:
 *                type: string
 *                example: "miguel@mail.com"
 *                description: The email of the patient
 *              password:
 *                type: string
 *                example: "123456"
 *                description: The password of the patient
 *              dateBirth:
 *                type: string
 *                example: "11/30/2001"
 *                description: The date of birth of the patient
 *              address:
 *                type: string
 *                example: "Calle 123"
 *                description: The address of the patient
 *              phone:
 *                type: integer
 *                example: 123456789
 *                description: The phone of the patient
 *    responses:
 *      200:
 *        description: patient updated
 */
router.route('/:id')
.patch(patientController.updatePatient)

module.exports = router;