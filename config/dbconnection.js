const mongoose = require("mongoose");

const dbconnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.connection_string);
        console.log("db connected:",connect.connection.name);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = dbconnect;