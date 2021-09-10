const { Candidate } = require('../models/candidate.js');
const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/role', async (req, res) => {
    console.log(`ROLEPUT:${req.sessionID}`);
    if (req.session.user !== undefined) {
        const user = await User.findById(req.session.user._id);
        user.role.push(req.body);
        if (req.body.roleType===1)
            user.newRole.push(await new Candidate(req.body).save())
        req.session.user = user;
        user.save();
        res.status(201).json({});
    }
    else
        res.status(201).json({ info: { error: "No ha iniciado sesión" } });
    res.end();
});

router.get('/role', async (req, res) => {
    console.log(`ROLEGET${req.sessionID}`);
    if (req.session.user !== undefined)
        res.status(201).json({ response: req.session.user.role });
    else
        res.status(201).json({ info: { error: "No ha iniciado sesión" } });
    res.end();
});
module.exports = router;