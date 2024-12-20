const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authorization = require("../middlewares/authorization.middleware.js");
const checkToken = require('../middlewares/checkTocken.middleware.js');

/**
 * @openapi
 * /healdtech/admin:
 *   post:
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Camilo Zapata
 *               rol:
 *                 type: string
 *                 example: admin
 *                 description: The user's rol.
 *               age:
 *                 type: integer
 *                 example: 30
 *                 description: The user's age.
 *               email:
 *                 type: string
 *                 example: zapatacamilo@gmail.com
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 example: "1234"
 *                 description: The user's password.
 *               dateBirth:
 *                 type: string
 *                 example: 11/30/2001
 *                 description: The user's date of birth.
 *               address:
 *                 type: string
 *                 example: "Calle 123"
 *                 description: The user's address.
 *               phone:
 *                 type: integer
 *                 example: 123456789
 *                 description: The user's phone.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: OK
 *                 rol:
 *                   type: string
 *                   example: admin
 *                 age:
 *                   type: integer
 *                   example: 30
 *                 email:
 *                   type: string
 *                   example: zapatacamilo@gmail.com
 *                 password:
 *                    type: string
 *                    example: "1rqw2qwe3rqwr45rwq6"
 *                 dateBirth:
 *                     type: string
 *                     example: 11/30/2001
 *                 address:
 *                      type: string
 *                      example: "Calle 123"
 *                 phone:
 *                      type: integer
 *                      example: 123456789
 */
router.post('/', checkToken, authorization("superAdmin", "admin"), adminController.createAdmin);

/**
 * @openapi
 * /healdtech/admin/:
 *   get:
 *     tags:
 *       - Admin
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
 *                 rol:
 *                   type: string
 *                   example: admin
 *                 name:
 *                   type: string
 *                   example: Camilo Zapata
 *                 age:
 *                   type: integer
 *                   example: 60
 *                 email:
 *                   type: string
 *                   example: zapatacma@gmail.com
 *                 password:
 *                   type: string
 *                   example: "1rqw2qwe3rqwr45rwq6"
 *                 dateBirth:
 *                   type: string
 *                   example: 11/30/2001
 *                 address:
 *                   type: string
 *                   example: "Calle 123"
 *                 phone:
 *                   type: integer
 *                   example: 123456789
 */
router.get('/', checkToken, authorization("admin"), adminController.findAllAdmins);

/**
 * @openapi
 * /healdtech/admin/doctors:
 *   get:
 *     tags:
 *       - Admin
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
 *                 rol:
 *                   type: string
 *                   example: doctor
 *                 name:
 *                   type: string
 *                   example: Camilo Zapata
 *                 age:
 *                   type: integer
 *                   example: 60
 *                 email:
 *                   type: string
 *                   example: zapatacma@gmail.com
 *                 password:
 *                   type: string
 *                   example: "1rqw2qwe3rqwr45rwq6"
 *                 dateBirth:
 *                   type: string
 *                   example: 11/30/2001
 *                 address:
 *                   type: string
 *                   example: "Calle 123"
 *                 phone:
 *                   type: integer
 *                   example: 123456789
 *                 specialty:
 *                   type: string
 *                   example: "cardiologist"
 *                 numberDoctor:
 *                   type: integer
 *                   example: 123456789
 */
router.get('/doctors', checkToken, authorization("admin"), adminController.findAllDoctors);

/**
 * @openapi
 * /healdtech/admin/patients:
 *   get:
 *     tags:
 *       - Admin
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
 *                 rol:
 *                   type: string
 *                   example: Patient
 *                 name:
 *                   type: string
 *                   example: Camilo Zapata
 *                 age:
 *                   type: integer
 *                   example: 60
 *                 email:
 *                   type: string
 *                   example: zapatacma@gmail.com
 *                 password:
 *                   type: string
 *                   example: "1rqw2qwe3rqwr45rwq6"
 *                 dateBirth:
 *                   type: string
 *                   example: 11/30/2001
 *                 address:
 *                   type: string
 *                   example: "Calle 123"
 *                 phone:
 *                   type: integer
 *                   example: 123456789
 */
router.get('/patients', checkToken, authorization("admin"), adminController.findAllPatient);

router.route('/:id', checkToken, authorization("admin"))
    /**
     * @openapi
     * /healdtech/admin/{id}:
     *   get:
     *     tags:
     *       - Admin id's
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         description: The user's id.
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
     *                 rol:
     *                   type: string
     *                   example: Patient
     *                 name:
     *                   type: string
     *                   example: Camilo Zapata
     *                 age:
     *                   type: integer
     *                   example: 60
     *                 email:
     *                   type: string
     *                   example: zapatacma@gmail.com
     *                 password:
     *                   type: string
     *                   example: "1rqw2qwe3rqwr45rwq6"
     *                 dateBirth:
     *                   type: string
     *                   example: 11/30/2001
     *                 address:
     *                   type: string
     *                   example: "Calle 123"
     *                 phone:
     *                   type: integer
     *                   example: 123456789
     */
    .get(adminController.findOneAdmin)
    /**
     * @openapi
     * /healdtech/admin/{id}:
     *  patch:
     *    tags:
     *      - Admin id's
     *    summary: Update an admin by id
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *        description: The id of the admin to update
     *        example: 213njlk4234
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              name:
     *                type: string
     *                description: The user's name.
     *                example: Camilo Zapata
     *              age:
     *                type: integer
     *                description: The user's age.
     *                example: 30
     *              email:
     *                type: string
     *                description: The user's email.
     *                example: zapata@gmail.com
     *              password:
     *                type: string
     *                description: The user's password.
     *                example: "1234"
     *              dateBirth:
     *                type: string
     *                description: The user's date of birth.
     *                example: 11/30/2001
     *              address:
     *                type: string
     *                description: The user's address.
     *                example: "Calle 123"
     *              phone:
     *                type: integer
     *                description: The user's phone.
     *                example: 123456789
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                name:
     *                  type: string
     *                  description: The user's name.
     *                  example: Camilo Zapata
     *                age:
     *                  type: integer
     *                  description: The user's age.
     *                  example: 30
     *                email:
     *                  type: string
     *                  description: The user's email.
     *                  example: zapata@gmail.com
     *                password:
     *                  type: string
     *                  description: The user's password.
     *                  example: "1234"
     *                dateBirth:
     *                  type: string
     *                  description: The user's date of birth.
     *                  example: 11/30/2001
     *                address:
     *                  type: string
     *                  description: The user's address.
     *                  example: "Calle 123"
     *                phone:
     *                  type: integer
     *                  description: The user's phone.
     *                  example: 123456789
     */
    .patch(adminController.updateAdmin)
    /**
     * @openapi
     * /healdtech/admin/{id}:
     *   delete:
     *     tags:
     *       - Admin id's
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The id of the admin to delete
     *         example: 213njlk4234
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Admin successfully deleted
     *
     */
    .delete(adminController.deleteAdmin);

// Doctor routes

router.route('/doctors/:id', checkToken, authorization("admin"))
    /**
     * @openapi
     * /healdtech/admin/doctors/{id}:
     *  get:
     *    tags:
     *      - Admin id's
     *    summary: Get a doctor by id
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *        description: The id of the doctor to get
     *        example: 213njlk4234
     *    responses:
     *      200:
     *        description: OK
     */
    .get(adminController.findOneDoctor)
    /**
     * @openapi
     * /healdtech/admin/doctors/{id}:
     *   delete:
     *     tags:
     *       - Admin id's
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           description: The id of the doctor to delete
     *           example: 213njlk4234
     *         description: The id of the doctor to delete
     *     responses:
     *       200:
     *         description: OK
     */
    .delete(adminController.deleteDoctor);

// Patient routes

router.route('/patients/:id')
    /**
     * @openapi
     * /healdtech/admin/patients/{id}:
     *  get:
     *    tags:
     *      - Admin id's
     *    summary: Get a doctor by id
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *        description: The id of the patients to get
     *        example: 213njlk4234
     *    responses:
     *      200:
     *        description: OK
     */
    .get(checkToken, authorization("admin", "doctor"), adminController.findOnePatient)
    /**
     * @openapi
     * /healdtech/admin/patients/{id}:
     *   delete:
     *     tags:
     *       - Admin id's
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           description: The id of the patient to delete
     *           example: 213njlk4234-asdasdf0312312-423
     *         description: The id of the patient to delete
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
     *
     */
    .delete(checkToken, authorization("admin"), adminController.deletePatient);

module.exports = router;