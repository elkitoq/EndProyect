const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/cv', async (req, res) => {
    console.log(`CV:${req.sessionID}`);
    console.log(req.session);
    console.log(req.body);
    const user = await User.findById(req.session.user._id);
    const role = user.role[req.body.role]
    if (role.roleFile[0] === undefined)
        role.roleFile[0] = { cv: req.body }
    else
        role.roleFile[0].cv = req.body;
    user.save();
    res.status(201).json({});
    res.end();
});

router.get('/cv', async (req, res) => {
    console.log(`getCV:${req.sessionID}`);
    console.log(req.query);
    if (req.session.user) {
        const user = await User.findById(req.session.user._id);
        const role = user.role[req.query.role]
        if (role.roleFile[0] === undefined)
            role.roleFile[0] = {}
        res.status(201).json({response:role.roleFile[0].cv});
    }
    else
        res.status(203).json({ info: { error: "no se registra se registra su session" } });
    res.end();
});
module.exports = router;