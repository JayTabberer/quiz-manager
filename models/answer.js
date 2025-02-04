const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Answer = sequelize.define('Answer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    questionId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Questions',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
});

module.exports = Answer;