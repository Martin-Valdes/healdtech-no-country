const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notifications.controller.js');
const authorization = require("../middlewares/authorization.middleware.js");
const checkToken = require('../middlewares/checkTocken.middleware.js');


// Para autorizar y verificar tocken se utilida como
// middleware : checkToken y  authorization("admin, patient, doctor")

/**
 * @openapi
 * /healdtech/notifications:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get all notifications
 *     responses:
 *       200:
 *         description: Return all notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message of the notification
 *                   example: This is a notification
 *                 type:
 *                   type: string
 *                   description: Type of the notification
 *                   example: type
 *                 send:
 *                   type: boolean
 *                   description: Send status of the notification
 *                   example: false
 *                 consultationId:
 *                   type: string
 *                   description: consultation id
 *                   example: 1313e4234-324mgfresg
 */
router.get('/', checkToken, authorization("admin"), notificationsController.getAllNotification);
/**
 * @openapi
 *   /healdtech/notifications/{id}:
 *     get:
 *       tags:
 *         - Notifications
 *       summary: Get notifications by id
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Notifications id
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Message of the notification
 *                     example: This is a notification
 *                   type:
 *                     type: string
 *                     description: Type of the notification
 *                     example: type
 *                   send:
 *                     type: boolean
 *                     description: Send status of the notification
 *                     example: false
 *                   consultationId:
 *                     type: string
 *                     description: consultationId id
 *                     example: 1313e4234-324mgfresg
 */
router.get('/notificationId/:id', checkToken, authorization("admin"), notificationsController.getNotificationById);
/**
 * @openapi
 *   /healdtech/notifications/patientId/{id}:
 *     get:
 *       tags:
 *         - Notifications
 *       summary: Get notification by patient id
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
 *                   message:
 *                     type: string
 *                     description: Message of the notification
 *                     example: This is a notification
 *                   type:
 *                     type: string
 *                     description: Type of the notification
 *                     example: type
 *                   send:
 *                     type: boolean
 *                     description: Send status of the notification
 *                     example: false
 *                   consultationId:
 *                     type: string
 *                     description: consultation id
 *                     example: 13142-3432dasd-314dasd
 */
router.get('/patientId/:id', checkToken, authorization("admin", "user"), notificationsController.getNotificationByUser);
/**
 * @openapi
 * /healdtech/notifications:
 *  post:
 *    tags:
 *      - Notifications
 *    summary: Create a notifications history
 *    description: Create a new notifications
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              consultationId:
 *                type: string
 *                description: consultation id
 *                example: 1123fwdsaf-243235rweqrfe
 *              message:
 *                type: string
 *                description: This is a notification
 *                example: This is a notification
 *              type:
 *                type: string
 *                description: Type of the notification
 *                example: type
 *              send:
 *                type: boolean
 *                description: Send status of the notification
 *                example: false
 *    responses:
 *      200:
 *        description: medical history created
 */
router.post('/', checkToken, authorization("admin"), notificationsController.createNotification);
router.patch('/:id', notificationsController.updateNotification);
/**
 * @openapi
 *   /healdtech/notifications/{id}:
 *     patch:
 *       tags:
 *         - Notifications
 *       summary: Patch notifications by id
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Notifications id
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                            type: string
 *                            description: The user's name.
 *                            example: Camilo Zapata
 *                          type:
 *                            type: integer
 *                            description: The user's age.
 *                            example: 30
 *                          send:
 *                            type: string
 *                            description: The user's email.
 *                            example: zapata@gmail.com
 *              
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Message of the notification
 *                     example: This is a notification
 *                   type:
 *                     type: string
 *                     description: Type of the notification
 *                     example: type
 *                   send:
 *                     type: boolean
 *                     description: Send status of the notification
 *                     example: false
 *                   consultationId:
 *                     type: string
 *                     description: consultationId id
 *                     example: 1313e4234-324mgfresg
 */


router.patch('/:id/enviado', notificationsController.markAsSent);
/**
 * @openapi
 * /healdtech/notifications/{id}:
 *   delete:
 *     tags:
 *       - Notifications
 *     summary: Delete medical history by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The id of the notification to delete
 *           example: 213njlk4234-asd3244-342fasdfdas
 *         description: The id of the notification to delete
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
 *                   description: This is a notification
 *                   example: 213njlk4234-asd3244-342fasdfdas
 *                 type:
 *                   type: string
 *                   description: Type of the notification
 *                   example: type
 *                 send:
 *                   type: boolean
 *                   description: Send status of the notification
 *                   example: false
 *                 consultationId:
 *                   type: string
 *                   description: consultation id
 *                   example: 1313e4234-324mgfresg
 */
router.delete('/:id', checkToken, authorization("admin"), notificationsController.deleteNotificationById);

module.exports = router;
