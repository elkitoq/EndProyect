const { getProfile } = require('../models/Profile.js');
const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/cv', async (req, res) => {
    console.log(`CV:${req.sessionID}`);
    //console.log(req.body);
    if (req.session.user) {
        const role = await getProfile(req.session.user.profile[req.body.role])
        if (role) {
            role.cv = req.body
            role.save();
        }
    }
    else {
        req.session.cv = req.body
    }
    res.status(201).json({info:{role:req.body.role}});
    res.end();
});

router.get('/cv', async (req, res) => {
    console.log(`getCV:${req.sessionID}`);
    console.log(req.query);
    if (req.session.user && req.query.role >= 0) {
        res.status(201).json({ response: (await getProfile(req.session.user.profile[req.query.role])).cv});
    }
    else if (req.query.id && req.query.type){
        const response = (await getProfile({profileType: parseInt(req.query.type),_id:req.query.id})).cv
        res.status(201).json({response});
    }
    else
        res.status(201).json({ response: req.session.cv });
    res.end();
});
module.exports = router;