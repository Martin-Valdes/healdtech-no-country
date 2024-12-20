const { DataTypes } = require('sequelize');
const { conn } = require('../db/DB_connection');

const Recipe =  conn.define('recipe',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dose: {
        type: DataTypes.STRING,
        allowNull: false
    },

    frecuency: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },

    notes: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


module.exports = Recipe;