const roleSchema = require('./Profile').schema
const applicationSchema = require('./Applications').applicationSchema;

const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');



const companySchema = extendSchema(roleSchema,{
    data: {
        razonSocial: String,
        address: String,
        cp: Number,
        city: String,
        phone: String,
        email: String
    },
    applications: [applicationSchema]
    });
    exports.Company = new mongoose.model('company', companySchema);
    exports.companySchema = companySchema;