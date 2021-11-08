const roleSchema = require('./Profile').schema

const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');


const freelanceSchema = extendSchema(roleSchema, {
    cv: {
        name: String,
        lastName: String,
        cuit: Number,
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
        skill: Array,
        photo:String
    },
    stalls: [{
        name: String,
        description: String,
        price: String
    }],
    private: { msg: String }
});
exports.Freelance = new mongoose.model('freelance', freelanceSchema);



exports.Freelance.finderService= (exp) =>new RegExp(exp, 'i')

exports.freelanceSchema = freelanceSchema;

async function findServices(exp) {

    exp = exports.Freelance.finderService(exp)

    return exports.Freelance.find({$or: [{ 'stalls.name': exp }, { 'stalls.description': exp }] });

}

exports.Freelance.findServices = findServices
