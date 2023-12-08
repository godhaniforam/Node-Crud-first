const asynchandler = require("express-async-handler");
const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// for register the user
// access public 
const registeruser = asynchandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.send(400);
        throw new Error("Validation Failed...");
    }
    const userAvilable = await user.findOne({ email });
    if (userAvilable) {
        res.status(400);
        res.json({ "message": "User alredy exists..." });
    }
    else {
        // hash password by bcrypt
        const hashpassword = await bcrypt.hash(password,10);
        const data = await user.create({ name, email, password:hashpassword });
        if(data){
            res.status(201).send({_id: data.id , _email: data.email});
        }else{
            res.status(400);
            throw new Error("User Data is not valied...");
        }
    }
});

// for login the user
// access public 
const loginuser = asynchandler(async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("validation Failed...");
    }
    const find_user = await user.findOne({email});
    // comapre password with hashpassword
    console.log(password);
    console.log(find_user);
    if(find_user && (await bcrypt.compare(password,find_user.password))){
        const accessToken = jwt.sign({
            user:{
                name:find_user.name,
                email:find_user.email,
                id:find_user._id
            }
        },process.env.access_token_secert,{expiresIn:"15m"});
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Credential error...");
    }
});

// for current user info
// access privet
const currentuser = asynchandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registeruser, loginuser, currentuser };