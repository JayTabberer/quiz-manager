const jwt = require('jsonwebtoken');

const authenticate = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ error: 'Access denied' });
        }

        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);

            if (roles.length && !roles.includes(verified.role)) {
                return res.status(401).json({ error: 'Access denied' });
            }

            req.user = verified;
            next();
        } catch (err) {
            res.status(400).json({ error: 'Invalid token' });
        }
    };
};

module.exports = authenticate;