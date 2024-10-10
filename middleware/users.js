const express = require('express')
const app = express()
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    try{
        
       if(decodedValue.username){
        req.username = decodedValue.username;
        next()
       }else{
        res.json({
            msg: "User does not exists"
        })
       }
    }catch(e){
        res.status(411).json({
            message: "Incorrect email and pass"
        })
    }
}

module.exports = userMiddleware;