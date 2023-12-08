const express = require("express");
const errorhandler = require("./middleware/errorhandler");
const dbconnect = require("./config/dbconnection");
const dotenv = require("dotenv").config();

const app = express();

dbconnect();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contact",require("./Route/contactRoute"));

app.use("/api/user",require("./Route/userRoute"));

app.use(errorhandler);

app.listen(port,()=>{
    console.log(`server is listen at ${port}`);
});