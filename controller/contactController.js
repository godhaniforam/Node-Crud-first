const contact = require("../models/contactModel");
const asynchandler = require("express-async-handler");

// for get all data
const getallcontact = asynchandler(async (req, res) => {
    const data = await contact.find();
    res.status(200).json(data)
});

// for create user
const createcontact = asynchandler(async (req, res) => {
    const { name, email, phno } = req.body;
    if (!name || !email || !phno) {
        res.status(400);
        throw new Error("All Fileds Are Required...");
    }
    const data = await contact.create({ name, email, phno });
    res.status(201).json(data);
});

// for get contact by id
const getcontact = asynchandler(async (req, res) => {
    const data = await contact.findById(req.params.id);
    if (!data) {
        res.status(404);
        throw new Error("Contact Not Found...");
    }
    res.status(200).json(data);
});

// for delete user by id
const deletecontact = asynchandler(async (req, res) => {
    const data = await contact.findByIdAndDelete(
        req.params.id
    );
    if(!data){
        res.send(404);
        throw new Error("Data Not Deleted...");
    }
    res.status(200).json({ message: `Delete User By id: ${req.params.id}` });
});

// for update user data
const updatecontact = asynchandler(async (req, res) => {
    const updatedata = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updatedata) {
        res.send(404);
        throw new Error("Data Not Updated...");
    }
    res.status(200).json(updatedata);
});


module.exports = { getallcontact, getcontact, updatecontact, deletecontact, createcontact };