const cors = require('cors');
require('dotenv').config();
const authenticate = require('./middleware/authenticate');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const bodyParser = require('body-parser');
const express = require('express');
const Quiz = require('./models/quiz');
const Question = require('./models/question');
const Answer = require('./models/answer');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/quizzes', quizRoutes);

app.get('/protected', authenticate(['admin', 'editor']), (req, res) => {
    res.json({message: 'You are authorized to access this protected route!', user: req.user});
});

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

sequelize.sync().then(() => {
    console.log('Database & tables created!');
}).catch(err => {
    console.log(err, 'error syncing database');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});