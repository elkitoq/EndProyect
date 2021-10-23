const { Freelance } = require('../models/Freelance.js');
const { User } = require('../models/User.js')
const router = require('express').Router();
const mongoose = require('mongoose');

router.put('/service', async (req, res) => {
    console.log(`SERVICE:${req.sessionID}`);
    console.log(req.body);

    const info = {}

    if (req.session.user && req.body.role) {
        const user = await User.findById(req.session.user._id);
        const profile = await Freelance.findById(user.profile[req.body.role]._id)
        if (profile) {
            if (req.body._id)
                Object.assign(profile.stalls.find((e)=>""+e._id===req.body._id),req.body)
            else
            profile.stalls.push(req.body)
            profile.save()
            info.saved = true;
        }
    }
    res.status(201).json({ info });
    res.end();
});

router.get('/service', async (req, res) => {
    console.log(`getSERVICE:${req.sessionID}`);
    console.log(req.query);

    var response

        if (req.session.user && req.query.role) {
            const user = await User.findById(req.session.user._id);
            const profile = await Freelance.findById(user.profile[req.query.role]._id)
            if (profile) {
                response=profile.stalls
            }
        }                
        else if (req.query.id){
            const id = mongoose.Types.ObjectId(req.query.id)
            const profile = await Freelance.findOne({"stalls._id":id})
            response=profile.stalls.find((e)=>""+e._id===req.query.id)
        }
    res.status(201).json({ response });
    res.end();
});

module.exports = router;
