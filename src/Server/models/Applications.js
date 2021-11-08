const mongoose = require('mongoose');
const CandidateSchema = require('./Profile').schema

const applicationSchema = new mongoose.Schema({
    name: String,
    description: String,
    req: String,
    zona: String,
    tipoContratacion:String,
    tipoContrato: Number,
    tipoJornada: Number,
    status: {type: Number,
        default:0},
    candidates:[{
        data:CandidateSchema,
        date:Date,
        status:Number
    }]
});

exports.applicationSchema = applicationSchema;

exports.Application = new mongoose.model('application', applicationSchema);

//buscar usuario por nombre
async function findByName(name,eq=false) {

    if (eq)
        name =  { '$eq': name }
    else
        name = new RegExp(name,'i')

    return exports.Application.find({ name });
}


exports.Application.findByName = findByName

//buscar usuario por nombre
async function findSimilar(exp) {

    exp = new RegExp(exp,'i')
    
    return exports.Application.find({ $or:[ {name: exp}, {description:exp}, {req:exp} ]});
    
}

exports.Application.findSimilar = findSimilar


//buscar usuario por candidato
async function findCandidate(id) {
    
    return exports.Application.find({ "candidates.data._id":id });
    
}

exports.Application.findCandidate = findCandidate