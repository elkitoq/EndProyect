const roleSchema = require('./Profile').schema

const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');


const candidateSchema = extendSchema(roleSchema,{
    cv: {
        name: String,
        lastName: String,
        age: Number,
        address: String,
        cp: Number,
        city: String,
        phone: String,
        email: String,
        puesto: String,
        description: String,
        laboral: Array,
        academico: Array,
        skill:Array,
        jobs:String,
        objetives:String,
        photo:String
    }});
    exports.Candidate = new mongoose.model('candidate', candidateSchema);
    exports.candidateSchema = candidateSchema;