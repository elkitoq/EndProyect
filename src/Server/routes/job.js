const { Aplication } = require('../models/Aplications.js');
const { getProfile } = require('../models/Profile.js');
const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/job', async (req, res) => {
    console.log(`JOB:${req.sessionID}`);
    console.log(req.body);

    if (req.session.user && req.body.role) {
        const profile = await getProfile(req.session.user.profile[req.body.role])
        if (profile) {
            profile.applications.push(await new Aplication(req.body).save())
            profile.save()
        }
    }

    res.status(201).json({});
    res.end();
});

router.get('/job', async (req, res) => {
    console.log(`getJOB:${req.sessionID}`);
    console.log(req.query);

    if (req.query.post) {
        const response = [];
        const match = {}

        for (const post of req.query.post.split(" ")) {
            const applications = await Aplication.findSimilar(post)
            for (const application of applications) {
                if (match[application._id]===undefined) {
                    response.push(Object.assign({ match: 1 }, application._doc));
                    match[application._id] = response.length - 1
                }else
                response[match[application._id]].match++;
            }
        }

        response.sort((a,b)=>b.match-a.match)

        res.status(201).json({ response });

    }



    if (req.session.user && req.query.role) {
        console.log(req.session.user);
        const profile = await getProfile(req.session.user.profile[req.query.role])
        if (profile) {
            res.status(201).json({ response: profile.applications });
        }
    }
    res.end();
});

module.exports = router;
