const { DataTypes } = require('sequelize');
const { conn } = require('../db/DB_connection');


const Notification = conn.define('notification', {
  id: {
    type: DataTypes.UUID, 
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  send: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  
});


module.exports = Notification;
