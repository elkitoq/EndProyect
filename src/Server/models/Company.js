const roleSchema = require('./Profile').schema
const aplicationSchema = require('./Aplications').aplicationSchema;

const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');



const companySchema = extendSchema(roleSchema,{
    data: {
        name: String,
        lastName: String,
        age: Number,
        imgCv: String,
        address: String,
        cp: Number,
        city: String,
        phone: String,
        email: String,
        puesto: String,
        description: String
    },
    applications: [aplicationSchema]
    });
    exports.Company = new mongoose.model('company', companySchema);
    exports.companySchema = companySchema;