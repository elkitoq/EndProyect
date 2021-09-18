const mongoose = require('mongoose');

const aplicationSchema = new mongoose.Schema({
    name: String,
    description: String,
    req: String
});

exports.aplicationSchema = aplicationSchema;

exports.Aplication = new mongoose.model('aplication', aplicationSchema);


//buscar usuario por nombre
async function findByName(name,eq=false) {

    if (eq)
        name =  { '$eq': name }
    else
        name = new RegExp(name,'i')

    return exports.Aplication.find({ name });
}


exports.Aplication.findByName = findByName

//buscar usuario por nombre
async function findSimilar(exp) {

    exp = new RegExp(exp,'i')

    return exports.Aplication.find({ $or:[ {name: exp}, {description:exp}, {req:exp} ]});
    
}


exports.Aplication.findSimilar = findSimilar


