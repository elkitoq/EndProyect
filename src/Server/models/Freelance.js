const roleSchema = require('./Profile').schema

const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');


const freelanceSchema = extendSchema(roleSchema,{
    cv: {
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
        description: String,
        laboral: Array,
        academico: Array,
        skill:Array
    },
    stalls: [{
        name: String,
        description: String,
        price: String
    }],
    private:{msg:String}
});
    exports.Freelance = new mongoose.model('freelance', freelanceSchema);
    exports.freelanceSchema = freelanceSchema;