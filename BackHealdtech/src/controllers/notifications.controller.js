const { Notification } = require('../models/index');
const { conn } = require('../db/DB_connection');
const Patient = require("../models/patientModel");
const Consultation = require("../models/consultaModel");
const Doctor = require("../models/doctorModel");

// Crear una notificación
exports.createNotification = async (req, res) => {
  try {
    const { consultationId, message, type, send } = req.body;

    if (!consultationId && !message && !type && !send) return res.status(400).send({ status: "error", error: "Incomplete values" });

    const notification = await Notification.create({
      consultationId: consultationId,
      message,
      type,
      send,
    });

    res.status(201).json({ message: "Notification successfully created.", data: notification });
  } catch (error) {
    res.status(500).json({ error: "Error creating the notification.", details: error.message });
  }
};

// Obtener todas las notificaciones
exports.getAllNotification = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
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

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the notifications.", details: error.message });
  }
};

// Obtener notificaciones por usuario
exports.getNotificationByUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ status: "error", error: "Incomplete values" })

    const notifications = await Notification.findOne({
      where: { id },
      include: [
        {
          model: Patient,
          as: 'patient',
        },
        {
          model: Consultation,
          as: 'consultation',
        },
      ],
    });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user notifications.", details: error.message });
  }
};

// Marcar una notificación como enviada
exports.markAsSent = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const notifications = await Notification.findOne(patientId);
    if (!notifications) {
      return res.status(404).json({ error: "Notification not found." });
    }

    notifications.send = true;
    await notifications.save();

    res.status(200).json({ message: "Notification marked as sent.", details: notifications });
  } catch (error) {
    res.status(500).json({ error: "Error marking the notification as sent.", details: error.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ status: "error", error: "Incomplete values" });

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found.' });
    }

    res.status(200).json({ message: 'Notification successfully found.', data: { notification } });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the notification.', details: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const search = await Notification.findByPk(id);
    if (!search) {
      return res.json({ message: 'Notification not found' });
    }

    const { consultationId, message, type, send } = req.body;

    const notificationUpdate =  await Notification.update(
      {
        consultationId, message, type, send
      },
      { where: { id } }
    )
    return res.json({ message: 'Notification update', data: { notificationUpdate } });
  } catch (err) {
    return res.status(500).json({ error: 'Error to update notification', details: err.message });
  }
};


// Eliminar notificacion
exports.deleteNotificationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ status: "error", error: "Incomplete values" });

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found.' });
    }
    await notification.destroy();
    res.status(200).json({ message: 'Notification delete.' });
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting.', details: error.message });
  }
};