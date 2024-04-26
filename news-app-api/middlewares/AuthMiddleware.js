require('dotenv').config();

const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    // Token'ı al
    const token = req.cookies.token;
    // Token kontrolü
    if (!token) {
        return res.status(401).json({ result: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user_id = decoded.user_id;
        req.user_role = decoded.user_role;
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ result: 'Unauthorized' });
    }
};

module.exports = authMiddleware;