const mongoose = require('mongoose');

const aplicationSchema = new mongoose.Schema({
    name: String,
    description: String,
    req: String
});

exports.Aplication = new mongoose.model('aplication', aplicationSchema);

exports.aplicationSchema = aplicationSchema;
