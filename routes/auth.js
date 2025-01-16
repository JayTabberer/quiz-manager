const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password, role});
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

dotenv.config();

router.post('/login', async (req, res) => {
    
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' }); 
        }

        // Generate an access token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' } 
        );

    res.json({ message: 'You are logged in!', token });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;