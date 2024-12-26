const { DataTypes } = require('sequelize');
const { conn } = require('../db/DB_connection');

const MedicalHistory = conn.define('medicalHistory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  medicalBackground: {
    type: DataTypes.TEXT, 
    allowNull: false
  },
  epidemiological: {
    type: DataTypes.TEXT, 
    allowNull: false
  },
  toxicHabits: {
    type: DataTypes.TEXT, 
    allowNull: false
  },
  medicalProcedures: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  diseases: {
    type: DataTypes.TEXT, 
    allowNull: false
  },
  medications: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  familyHistory: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  epicrisis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
});

module.exports = MedicalHistory;

