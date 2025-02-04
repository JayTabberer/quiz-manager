const jwt = require('jsonwebtoken');

const authenticate = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:', authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log('Decoded Token:', decoded);
            req.user = decoded;

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (err) {
            console.error('JWT Verification Error:', err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
    };
};

module.exports = authenticate;