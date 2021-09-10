




const mongoose = require('mongoose');



const roleSchema = new mongoose.Schema({
    roleType: Number,
    roleName: String
});

exports.schema = roleSchema;
