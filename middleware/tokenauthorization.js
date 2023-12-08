const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asynchandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.access_token_secert,(err,data)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized...");
            }
            req.user = data.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User not authorized or Token is missing...");
        }
    }
});

module.exports = validateToken;