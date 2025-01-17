const express = require('express');
const authenticate = require('../middleware/authenticate');
const Quiz = require('../models/quiz');
const router = express.Router();

router.post('/', authenticate(['admin', 'editor']), async (req, res) => {
    try {
        const { title } = req.body;
        const quiz = await Quiz.create({ title });
        res.status(201).json(quiz);
    } catch (err) {
        res.status(500).json({ error: "Error creating quiz", message: err.message });
    }
});

router.get('/', authenticate(), async (req, res) => {
    try {
        const quizzes = await Quiz.findAll();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ error: "Error getting quizzes", message: err.message });
    }
});

router.get('/:id', authenticate(), async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ error: "Error getting quiz", message: err.message });
    }
});

router.put('/:id', authenticate(['admin', 'editor']), async (req, res) => {
    try {
        const { title } = req.body;
        const quiz = await Quiz.findByPk(req.params.id);

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        } else {
            quiz.title = title;
            await quiz.save();
            res.json(quiz);
        }
    } catch (err) {
        res.status(500).json({ error: "Error updating quiz", message: err.message });
    }
});

router.delete('/:id', authenticate(['admin', 'editor']), async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        await quiz.destroy();
        res.json({ message: "Quiz deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting quiz", message: err.message });
    }
});

module.exports = router;