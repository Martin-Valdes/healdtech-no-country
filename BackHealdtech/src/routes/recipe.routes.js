const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');
const authorization = require("../middlewares/authorization.middleware.js");
const checkToken = require('../middlewares/checkTocken.middleware.js');

/**
 * @openapi
 * /healdtech/recipes:
 *   get:
 *     tags:
 *       - Recipes
 *     responses:
 *       200:
 *         description: Return all recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Recipe name
 *                   example: Paracetamol
 *                 dose:
 *                   type: string
 *                   description: Recipe dose
 *                   example: 500mg
 *                 frecuency:
 *                   type: integer
 *                   description: Recipe frecuency
 *                   example: 8
 *                 duration:
 *                   type: string
 *                   description: Recipe duration
 *                   example: 5 days
 *                 notes:
 *                   type: string
 *                   description: Recipe notes
 *                   example: Take with food
 *                 consultationId:
 *                   type: string
 *                   description: Consultation id
 *                   example: 123456
 */
router.get('/', checkToken, authorization("admin"), recipeController.getAllRecipe);
/**
 * @openapi
 * /healdtech/recipes:
 *   post:
 *     tags:
 *       - Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Recipe name
 *                 example: Paracetamol
 *               dose:
 *                 type: string
 *                 description: Recipe dose
 *                 example: 500mg
 *               frecuency:
 *                 type: integer
 *                 description: Recipe frecuency
 *                 example: 8
 *               duration:
 *                 type: string
 *                 description: Recipe duration
 *                 example: 5 days
 *               notes:
 *                 type: string
 *                 description: Recipe notes
 *                 example: Take with food
 *               consultationId:
 *                 type: string
 *                 description: Consultation id
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Create a recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Recipe name
 *                   example: Paracetamol
 *                 dose:
 *                   type: string
 *                   description: Recipe dose
 *                   example: 500mg
 *                 frecuency:
 *                   type: integer
 *                   description: Recipe frecuency
 *                   example: 8
 *                 duration:
 *                   type: string
 *                   description: Recipe duration
 *                   example: 5 days
 *                 notes:
 *                   type: string
 *                   description: Recipe notes
 *                   example: Take with food
 *                 consultationId:
 *                   type: string
 *                   description: Consultation id
 *                   example: 123456
 */
router.post('/', checkToken, authorization("doctor"), recipeController.createRecipe);
/**
 * @openapi
 * /healdtech/recipes/{id}:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get a recipe by id
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         example: 123456
 *         required: true
 *     description: Get a recipe by id
 *     responses:
 *       200:
 *         description: Recipe found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Recipe name
 *                   example: Paracetamol
 *                 dose:
 *                   type: string
 *                   description: Recipe dose
 *                   example: 500mg
 *                 frecuency:
 *                   type: integer
 *                   description: Recipe frecuency
 *                   example: 8
 *                 duration:
 *                   type: string
 *                   description: Recipe duration
 *                   example: 5 days
 *                 notes:
 *                   type: string
 *                   description: Recipe notes
 *                   example: Take with food
 *                 consultationId:
 *                   type: string
 *                   description: Consultation id
 *                   example: 123456
 */
router.get('/:id', checkToken, authorization("admin", "doctor"), recipeController.getRecipeById);
/**
 * @openapi
 * /healdtech/recipes/{id}:
 *   delete:
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The id of the recipe to delete
 *           example: 213njlk4234-asdasdf0312312-423
 *         description: The id of the recipe to delete
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
 *                   description: Recipe name
 *                   example: Paracetamol
 *                 dose:
 *                   type: string
 *                   description: Recipe dose
 *                   example: 500mg
 *                 frecuency:
 *                   type: integer
 *                   description: Recipe frecuency
 *                   example: 8
 *                 duration:
 *                   type: string
 *                   description: Recipe duration
 *                   example: 5 days
 *                 notes:
 *                   type: string
 *                   description: Recipe notes
 *                   example: Take with food
 *                 consultationId:
 *                   type: string
 *                   description: Consultation id
 *                   example: 123456
 */
router.delete('/:id', checkToken, authorization("admin", "doctor"), recipeController.deleteRecipeById);

module.exports = router;