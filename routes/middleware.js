const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

    if (token === undefined) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
