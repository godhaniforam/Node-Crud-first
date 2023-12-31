const express = require("express");
const app = express();
const { getallcontact, getcontact, updatecontact, deletecontact, createcontact } = require("../controller/contactController");
const validateToken = require("../middleware/tokenauthorization");

app.use(validateToken);

app.route("/").get(getallcontact).post(createcontact);

app.route("/:id").get(getcontact).put(updatecontact).delete(deletecontact);

module.exports = app;