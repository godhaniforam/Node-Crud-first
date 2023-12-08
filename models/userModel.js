const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "please add the name..."]
    },
    email: {
        type: String,
        require: [true, "please add the email..."]
    },
    password: {
        type: String,
        require: [true, "please add the Password..."]
    }
},
    {
        timestamp: true
    }
);

module.exports = mongoose.model("user",userSchema);