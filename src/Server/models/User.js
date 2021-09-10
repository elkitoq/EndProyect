const roleSchema = require('./Role').schema

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
    newRole: [roleSchema],
    role: [{
        roleType: Number,
        roleName: String,
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
        applications: [{
            name: String,
            description: String,
            req: String
        }],
        stalls: [{
            name: String,
            description: String,
            price: String
        }]
    }]
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