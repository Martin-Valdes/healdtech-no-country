const MedicalHistory = require('../models/medicalHistory.js');
const Patient = require('../models/patientModel.js');
const Consultation = require('../models/consultaModel.js');
const Doctor = require('../models/doctorModel.js')

exports.createMedicalHistory = async (req, res) => {
  try {
    const {
      patientId,
      consultationId,
      ...rest
    } = req.body;
    if (!patientId || !consultationId) return res.status(400).send({ status: "error", error: "Incomplete values" });
    
    const medicalHistory = await MedicalHistory.create({
      patientId,
      consultationId,
      ...rest
    });

    res.status(201).json({
      message: "Medical History successfully created.",
      data: medicalHistory
    });
  } catch (error) {
    res.status(500).json({
      error: "Error creating the History.",
      details: error.message
    });
  }
};


// Obtener todas las Historias Medicas
exports.getAllMedicalHistory = async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["id", "name", "email"],
        },
        {
          model: Consultation,
          as: "consultation",
          include: [
            {
              model: Doctor,
              as: 'doctor',
              attributes: ['id', 'name', 'specialty'],
            },
          ],
        },
      ],
    });
    res.status(200).json(medicalHistory);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the medical Histories.", details: error.message });
  }
};

// Obtener historial por usuario
exports.getMedicalHistoryByUser = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) return res.status(400).send({ status: "error", error: "Incomplete values" })

    const medicalHistory = await MedicalHistory.findOne({
      where: { patientId },
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["id", "name"],
        },
        {
          model: Consultation,
          as: "consultation",
          include: [
            {
              model: Doctor,
              as: 'doctor',
              attributes: ['id', 'name', 'specialty'],
            },
          ],
        },

      ],
    });

    res.status(200).json({ message: "Medical History found successfully", data: medicalHistory });
  } catch (error) {
    res.status(500).json({ error: "Error fetching the medical Histories.", details: error.message });
  }
};

//BUSCAR HISTORIA POR ID
exports.getMedicalHistroyById = async (req, res) => {
  try {
    const { id } = req.params;

    const medicalHistory = await MedicalHistory.findByPk(id);
    if (!medicalHistory) {
      return res.status(404).json({ error: 'Medical History not found.' });
    };

    res.status(200).json({ message: 'Medical History found', data: medicalHistory });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the medical Histories.', details: error.message });
  }
};

exports.deleteMedicalHistoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const medicalHistory = await MedicalHistory.findByPk(id);
    if (!medicalHistory) {
      return res.status(404).json({ error: 'Medical History not found.' });
    }
    await medicalHistory.destroy();
    res.status(200).json({ message: 'Medical History delete.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the medical history.', details: error.message });
  }
};