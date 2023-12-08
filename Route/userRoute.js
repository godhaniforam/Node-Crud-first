const express = require("express");
const { registeruser, loginuser, currentuser } = require("../controller/userController");
const validateToken = require("../middleware/tokenauthorization");

const app = express();

app.post("/register",registeruser);

app.post("/login",loginuser);

app.get("/current",validateToken,currentuser);

module.exports = app;