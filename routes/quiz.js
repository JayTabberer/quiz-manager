const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const Question = require('../models/question');
const Answer = require('../models/answer');
const authenticate = require('../middleware/authenticate');

// Create a new quiz
router.post('/', authenticate(['admin', 'editor']), async (req, res) => {
    try {
        const { title, questions } = req.body;
        const quiz = await Quiz.create({ title });
        if (questions && questions.length > 0) {
            for (const question of questions) {
                const createdQuestion = await Question.create({ text: question.text, quizId: quiz.id });
                if (question.answers && question.answers.length > 0) {
                    for (const answer of question.answers) {
                        await Answer.create({ text: answer.text, is_correct: answer.is_correct, questionId: createdQuestion.id });
                    }
                }
            }
        }
        res.status(201).json(quiz);
    } catch (err) {
        res.status(500).json({ error: "Error creating quiz", message: err.message });
    }
});

// Get all quizzes
router.get('/', authenticate(), async (req, res) => {
    try {
        const quizzes = await Quiz.findAll();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ error: "Error getting quizzes", message: err.message });
    }
});

// Get a quiz by id
router.get('/:id', authenticate(['admin', 'editor', 'user', 'viewer']), async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id, {
            include: [
                {
                    model: Question,
                    as: 'questions',
                    include: [
                        {
                            model: Answer,
                            as: 'answers',
                        },
                    ],
                },
            ],
        });
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ error: "Error getting quiz", message: err.message });
    }
});

// Update a quiz by id
router.put('/:id', authenticate(['admin', 'editor']), async (req, res) => {
    try {
        const { title, questions } = req.body;
        const quiz = await Quiz.findByPk(req.params.id);

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        await quiz.update({ title });

        if (questions && questions.length > 0) {
            // Delete existing questions and answers
            await Question.destroy({ where: { quizId: quiz.id } });

            // Create new questions and answers
            for (const question of questions) {
                const createdQuestion = await Question.create({ text: question.text, quizId: quiz.id });
                if (question.answers && question.answers.length > 0) {
                    for (const answer of question.answers) {
                        await Answer.create({ text: answer.text, is_correct: answer.isCorrect, questionId: createdQuestion.id });
                    }
                }
            }
        }

        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ error: "Error updating quiz", message: err.message });
    }
});

// Delete a quiz by id
router.delete('/:id', authenticate(['admin', 'editor']), async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        await Question.destroy({ where: { quizId: quiz.id } });
        await quiz.destroy();
        res.json({ message: "Quiz deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting quiz", message: err.message });
    }
});

module.exports = router;