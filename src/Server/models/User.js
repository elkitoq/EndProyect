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
        status: Number,
        roleType: Number,
        roleName: String,
        roleFile: [{
            cv: {
                name: String,
                lastName: String,
                age: Number,
                imgCv: String,
                city:String,
                adress: String,
                cp: Number,
                phone: String,
                email: String,
                experience: Array
            },
            applications: Array,
            stalls: Array
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