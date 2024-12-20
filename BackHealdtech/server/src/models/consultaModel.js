const { DataTypes } = require('sequelize');
const { conn } = require('../db/DB_connection');

const Consultation = conn.define('consultation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
    ,
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Consultation;