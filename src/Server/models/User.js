const roleSchema = require('./Profile').schema

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    emailReference: {
        type: String
    },
    socialAcount: {
        google: String,
        facebook: String
    },
    codeRecoveryPass: {
        type: String
    },
    profile: [roleSchema]
});

exports.User = new mongoose.model('users', userSchema);

//buscar usuario por nombre
async function findUserByName(name) {

    const user = await exports.User.find({ name: { '$eq': name } });
    return user[0];
}

exports.User.findByName = findUserByName;

//buscar usuario por email(para recuperación de password)
async function findUserByEmail(email) {
    
    const user = await exports.User.find({ email: { '$eq': email } });
    return user[0];
}


exports.User.findByEmail = findUserByEmail;