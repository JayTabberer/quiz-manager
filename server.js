const authenticate = require('./middleware/authenticate');
const sequelize = require('./config/database');
const Question = require('./models/question');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const express = require('express');
const User = require('./models/user');
const Quiz = require('./models/quiz');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.get('/protected', authenticate(['admin', 'editor']), (req, res) => {
    res.json({message: 'You are authorized to access this protected route!', user: req.user});
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
}).catch(err => {
    console.log(err, 'error syncing database');
});