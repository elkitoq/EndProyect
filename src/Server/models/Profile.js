const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    profileType: Number,
    profileName: String
});

exports.schema = profileSchema;

const { Candidate } = require('./candidate');
const { Company } = require('./Company');
const { Freelance } = require('./Freelance');

const newProfile = async (profile) => {
    // user.role.push(profile);
    if (profile.profileType === 0)
        return (await new Company(profile).save())
    else if (profile.profileType === 1)
        return (await new Candidate(profile).save())
    else if (profile.profileType === 2)
        return (await new Freelance(profile).save())
}

exports.newProfile = newProfile;

const getProfile = async (profile) => {
    if (profile.profileType === 0)
        return (await Company.findById(profile._id))
    else if (profile.profileType === 1)
        return (await Candidate.findById(profile._id))
    else if (profile.profileType === 2)
        return (await Freelance.findById(profile._id))
}
exports.getProfile = getProfile;