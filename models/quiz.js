const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Question = require('./question');
const Answer = require('./answer');

const Quiz = sequelize.define('Quiz', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Quiz.hasMany(Question, {
    foreignKey: 'quizId',
    as: 'questions',
    onDelete: 'CASCADE',
});
Question.belongsTo(Quiz, {
    foreignKey: 'quizId',
    as: 'quiz',
});
Question.hasMany(Answer, {
    foreignKey: 'questionId',
    as: 'answers',
    onDelete: 'CASCADE',
});
Answer.belongsTo(Question, {
    foreignKey: 'questionId',
    as: 'question',
});

module.exports = Quiz;