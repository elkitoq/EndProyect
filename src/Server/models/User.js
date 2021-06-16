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
    role: [{
        roleType: Number,
        roleName: String,
        cv: {
            name: String,
            lastName: String,
            age: Number,
            imgCv: String,
            adress: String,
            cp: Number,
            city: String,
            phone: String,
            email: String,
            experience: Array
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

    const regExpTerm = new RegExp(name, 'i');
    const regExprSearch = [
        { name: { $regex: regExpTerm } }
    ];
    const user = await exports.User.find({ '$or': regExprSearch });
    return user[0];
}

exports.User.findByName = findUserByName;

//buscar usuario por email(para recuperacion de password)
async function findUserByEmail(email) {

    const regExpTerm = new RegExp(email, 'i');
    const regExprSearch = [
        { email: { $regex: regExpTerm } }
    ];
    const user = await exports.User.find({ '$or': regExprSearch });
    return user[0];
}


exports.User.findByEmail = findUserByEmail;