const ConsultationModel = require("../models/consultaModel");
const PatientModel = require("../models/patientModel");
const DoctorModel = require("../models/doctorModel");

exports.createConsultation = async (req, res) => {
  try {
    const { ...rest } = req.body;

    const createConsultation = await ConsultationModel.create({
      ...rest,
    });
    return res.json({
      message: "Consulta creada correctamente.",
      data: createConsultation,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.findAllConsultations = async (req, res) => {
  try {
    const allConsultations = await ConsultationModel.findAll({
      include: [
        {
          model: PatientModel,
        },
        {
          model: DoctorModel,
        },
      ],
      attributes: { exclude: ["patientId", "doctorId"] },
    });
    return res.json({
      message: "All consult send ok.",
      data: allConsultations,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error al buscar las consultas.", details: err.message });
  }
};

exports.findOneConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await ConsultationModel.findByPk(id, {
      include: [
        {
          model: PatientModel,
        },
        {
          model: DoctorModel,
        },
      ],
      attributes: { exclude: ["patientId", "doctorId"] },
    });

    if (!findOne) {
      return res.json({ message: "Consulta no encontrada." });
    }

    return res.json(findOne);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error al buscar la consulta.", details: err.message });
  }
};

exports.updateConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    
    const search = await ConsultationModel.findByPk(id);

    if (!search) {
      return res.json({ message: "Consulta no encontrada." });
    }

    const update = await ConsultationModel.update(
      {
        state:state,
      },
      { where: { id } }
    );
    return res.json({
      message: "Consulta actualizada correctamente.",
      data: { update },
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        error: "Error al actualizar la consulta.",
        details: err.message,
      });
  }
};

exports.deleteConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    const search = await ConsultationModel.findByPk(id);

    if (!search) {
      return res.json({ message: "Consulta no encontrada." });
    }

    await ConsultationModel.destroy({ where: { id } });

    return res.json({ message: "Consulta eliminada correctamente." });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error al eliminar la consulta.", details: err.message });
  }
};

exports.getAllConsult = async (req, res) => {
  const patientId = req.params.id;

  try {
    const totalConsult = await ConsultationModel.count({
      where: {
        patientId: patientId,
      },
    });
    const totalPending = await ConsultationModel.count({
      where: {
        patientId,
        state: "pendiente",
      },
    });
    const canceledConsult = await ConsultationModel.count({
      where: {
        patientId: patientId,
        state: "cancelada",
      },
    });
    return res.json({
      message: "Consulta actualizada correctamente.",
      data: { totalConsult, totalPending, canceledConsult },
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        error: "Error in obtaining statistics from the doctor",
        details: err.message,
      });
  }
};

exports.findAllConsultationsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "El ID del usuario es requerido." });
    }
    console.log(id)
    const consultations = await ConsultationModel.findAll({
      where: { patientId: id },
      include: [
        {
          model: PatientModel,
        },
        {
          model: DoctorModel,
        },
      ],
    });
    if (!consultations || consultations.length === 0) {
      return res.status(404).json({ message: "No se encontraron consultas para este usuario." });
    }
console.log(consultations)
    return res.status(200).json({data:consultations});
  } catch (err) {
    console.error("Error al buscar consultas:", err);
    return res.status(500).json({
      error: "Error al buscar las consultas.",
      details: err.message,
    });
  }
};
