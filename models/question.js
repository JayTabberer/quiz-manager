const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // quizId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'Quizzes',
    //         key: 'id',
    //     },
    //     onDelete: 'CASCADE',
    // },
});

module.exports = Question;