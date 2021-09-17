const { newProfile, getProfile } = require('../models/Profile.js');
const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/profile', async (req, res) => {
    console.log(`PROFILEPUT:${req.sessionID}`);
    if (req.session.user !== undefined) {
        const user = await User.findById(req.session.user._id);
        user.profile.push(await newProfile(req.body))
        req.session.user = user;
        user.save();
        res.status(201).json({});
    }
    else
        res.status(201).json({ info: { error: "No ha iniciado sesión" } });
    res.end();
});

router.get('/profile', async (req, res) => {
    console.log(`PROFILEGET${req.sessionID}`);
    if (req.query.id && req.query.type){
        const response = await getProfile({profileType: parseInt(req.query.type),_id:req.query.id})
        response.private=undefined;
        res.status(201).json({response});
    }
        
    else if (req.session.user !== undefined){
        if (req.query.index)
            res.status(201).json({ response: await getProfile(req.session.user.profile[req.query.index])});
        else
            res.status(201).json({ response: req.session.user.profile });
    }
    else
        res.status(201).json({ info: { error: "No ha iniciado sesión" } });
    res.end();
});


module.exports = router;