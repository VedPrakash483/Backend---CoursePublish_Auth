const express = require('express')
const app = express()
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" });
    }

    const words = token.split(" ");
    const jwtToken = words[1];

    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        req.username = decodedValue.username;
        if (decodedValue.username) {
            req.username = decodedValue.username;
            next();
        } else {
            res.status(403).json({ msg: "User does not exist" });
        }
    } catch (e) {
        console.error(e); // Log the error for debugging
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = adminMiddleware;
