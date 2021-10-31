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
                Object.assign(profile.stalls.find((e) => "" + e._id === req.body._id), req.body)
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

    var response = []

    if (req.session.user && req.query.role) {
        const user = await User.findById(req.session.user._id);
        const profile = await Freelance.findById(user.profile[req.query.role]._id)
        if (profile) {
            response = profile.stalls
        }
    }
    else if (req.query.id) {
        const id = mongoose.Types.ObjectId(req.query.id)
        const profile = await Freelance.findOne({ "stalls._id": id })
        response = profile.stalls.find((e) => "" + e._id === req.query.id)
    }
    else if (req.query.job) {
        const match = {}

        for (const post of req.query.job.split(" ")) {
            const freelances = await Freelance.findServices(post)
            for (const freelance of freelances) {
                const services = freelance.stalls.filter((e) => {
                    var test = false

                    for (const prop in e._doc)
                        if (prop.substr(0, 1) !== '_')
                            test |= Freelance.finderService(post).test(e[prop])



                    return test
                })

                for (const service of services) 
                    if (match[service._id] === undefined) {
                        response.push(Object.assign({ match: 1,freelance:freelance.cv }, service._doc));
                        match[service._id] = response.length - 1
                    } else
                        response[match[service._id]].match++;
            }
        }
        response.sort((a, b) => b.match - a.match)
    }
    res.status(201).json({ response });
    res.end();
});

module.exports = router;
