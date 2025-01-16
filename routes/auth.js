const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Register route
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Creating user...');
        const user = await User.create({
            username,
            password: hashedPassword,
            role
        });

        res.json({ message: 'User created successfully', user });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Finding user...');
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        console.log('Checking password...');
        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password check result:', validPassword);
        if (!validPassword) {
            console.log('Invalid password');
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        console.log('Generating token...');
        console.log('TOKEN_SECRET:', process.env.TOKEN_SECRET);
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.TOKEN_SECRET
        );

        res.json({ message: 'You are logged in!', token });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;