const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    cv: {
        type: JSON,
    }
});

exports.User = new mongoose.model('users', userSchema);

async function findUserByName(name) {

    const regExpTerm = new RegExp(name, 'i');
    const regExprSearch = [
        { name: { $regex: regExpTerm } }
    ];
    const user = await exports.User.find({ '$or': regExprSearch });
    return user[0];
}

exports.User.findByName = findUserByName;