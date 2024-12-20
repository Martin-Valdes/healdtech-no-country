const doctorModel = require('../models/doctorModel');
const patientModel = require('../models/patientModel');
const consultaModel = require('../models/consultaModel');
const { createHash } = require('../utils/hashPassword');

exports.createDoctor = async (req, res) => {
    try {
        const { name, rol, age, email, password, dateBirth, address, phone, specialty, patientId } = req.body;

        const hashedPassword = createHash(password);

        const create = await doctorModel.create({
            name,
            rol,
            age,
            email,
            password : hashedPassword,
            dateBirth,
            address,
            phone,
            specialty,
            patientId
        })
        return res.json({ message: 'Doctor creado correctamente.', data: create });
    } catch (err) {
        return res.status(500).json({ error: 'Error al crear el doctor.', details: err.message });
    }
}

exports.getAllCalendar = async (req, res) => {
    const doctorId = req.params.id;

    try {
        const totalPatients = await patientModel.count({
            include: {
                model: consultaModel,
                where: { doctorId }
            },
            distinct: true
        })

        const allConsultations = await consultaModel.count({
            where: {
                doctorId,
                state: 'Atendido'
            }
        })

        const totalPending  = await consultaModel.count({
            where: {
                doctorId,
                state: 'pendiente'
            }
        })

        res.json({
            totalPatients,
            allConsultations,
            totalPending
        })
    } catch (err) {
        return res.status(500).json({ error: 'Error in obtaining statistics from the doctor', details: err.message });
    }
}

exports.updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        const search = await doctorModel.findByPk(id);
        if (!search) {
            return res.json({ message: 'Doctor no encontrado.' });
        }

        const { name, rol, age, email, password, dateBirth, address, phone, specialty} = req.body;
        const hashedPassword = createHash(password);

        await doctorModel.update(
            {
                name,
                rol,
                age,
                email,
                password: hashedPassword,
                dateBirth,
                address,
                phone,
                specialty
            },
            { where: { id } }
        )
        return res.json({ message: 'Doctor actualizado correctamente.', data: { name, rol, age, email, password, dateBirth, address, phone, specialty } });
    } catch (err) {
        return res.status(500).json({ error: 'Error al actualizar el doctor.', details: err.message });
    }
}
