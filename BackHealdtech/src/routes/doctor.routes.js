const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const authorization = require("../middlewares/authorization.middleware.js");
const checkToken = require('../middlewares/checkTocken.middleware.js');

/**
 * @openapi
 * /healdtech/doctor:
 *  post:
 *    tags:
 *      - Doctor
 *    summary: Create a new doctor
 *    description: Create a new doctor
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Juan"
 *                description: The name of the doctor
 *              rol:
 *                type: string
 *                example: "doctor"
 *                description: The role of the doctor
 *              age:
 *                type: integer
 *                example: 30
 *                description: The age of the doctor
 *              email:
 *                type: string
 *                example: "juan@mail.com"
 *                description: The email of the doctor
 *              password:
 *                type: string
 *                example: "123456"
 *                description: The password of the doctor
 *              dateBirth:
 *                type: string
 *                example: "11/30/2001"
 *                description: The date of birth of the doctor
 *              address:
 *                type: string
 *                example: "Calle 123"
 *                description: The address of the doctor
 *              phone:
 *                type: integer
 *                example: 123456789
 *                description: The phone of the doctor
 *              specialty:
 *                type: string
 *                example: "Cardiología"
 *    responses:
 *      200:
 *        description: Doctor created
 */
router.post('/', checkToken, authorization("admin"), doctorController.createDoctor);
/**
 * @openapi
 * /healdtech/doctor/{id}:
 *   get:
 *     tags:
 *       - Doctor
 *     summary: Get doctor's calendar
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The doctor's id.
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
 *                   example: 21432irojfew213
 */
router.get('/:id', checkToken, authorization("doctor"), doctorController.getAllCalendar)
/**
 * @openapi
 * /healdtech/doctor/{id}:
 *  patch:
 *    tags:
 *      - Doctor
 *    summary: Update doctor
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 21432irojfew213
 *        description: The doctor's id.
 *        example: 21432irojfew213
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Juan"
 *                description: The name of the doctor
 *              rol:
 *                type: string
 *                example: "doctor"
 *                description: The role of the doctor
 *              age:
 *                type: integer
 *                example: 30
 *                description: The age of the doctor
 *              email:
 *                type: string
 *                example: "juan@mail.com"
 *                description: The email of the doctor
 *              password:
 *                type: string
 *                example: "123456"
 *                description: The password of the doctor
 *              dateBirth:
 *                type: string
 *                example: "11/30/2001"
 *                description: The date of birth of the doctor
 *              address:
 *                type: string
 *                example: "Calle 123"
 *                description: The address of the doctor
 *              phone:
 *                type: integer
 *                example: 123456789
 *                description: The phone of the doctor
 *              specialty:
 *                type: string
 *                example: "Cardiología"
 *                description: The specialty of the doctor
 *    responses:
 *      200:
 *        description: Doctor updated
 */
router.route('/:id',checkToken, authorization("admin", "doctor")).patch(doctorController.updateDoctor)

module.exports = router;