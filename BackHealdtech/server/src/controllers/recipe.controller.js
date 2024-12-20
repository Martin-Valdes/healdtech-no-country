const { conn } = require('../db/DB_connection');
const Patient = require("../models/patientModel");
const Consultation = require("../models/consultaModel");
const Doctor = require("../models/doctorModel");
const Recipe = require('../models/recipeModel');

// Crear una receta
exports.createRecipe = async (req, res) => {
  try {
    const { consultationId,...rest  } = req.body;

    if (!consultationId) {
        return res.status(400).json({ error: "ConsultationId is required." });
      }
    const recipe = await Recipe.create({
      ...rest,
      consultationId: consultationId,
    });

    res.status(201).json({ message: "Recipe successfully created.", data: recipe });
  } catch (error) {
    res.status(500).json({ error: "Error creating the recipe.", details: error.message });
  }
};

// Obtener todas las recetas
exports.getAllRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        {
          model: Consultation,
          as: "consultation",
          include: [
            {
              model: Patient,
              as: 'patient',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: Doctor,
              as: 'doctor',
              attributes: ['id', 'name', 'specialty'],
            },
          ],
        },
      ],
    });

    res.status(200).json({message: "OK", data: recipes});
  } catch (error) {
    res.status(500).json({ error: "Error fetching the recipes.", details: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ status: "error", error: "Incomplete values" });

    const recipe = await Recipe.findByPk(id);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }

    res.status(200).json({ message: 'Recipe successfully found.', data: recipe });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the recipe.', details: error.message });
  }
};

// Eliminar receta
exports.deleteRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id);

    if (!recipe) return res.status(400).send({ status: "error", error: "Incomplete values" });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found.' });

    await Recipe.destroy( {where: {id} });
    res.status(200).json({ message: 'Recipe delete.' });
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting.', details: error.message });
  }
};