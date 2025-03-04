const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documentId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    assignedNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Attendance;
