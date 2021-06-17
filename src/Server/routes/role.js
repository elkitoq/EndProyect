const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/role', async (req, res) => {
    console.log(`ROLEPUT:${req.sessionID}`);
    const user=await User.findById(req.session.user._id);
    user.role.push(req.body);
    req.session.user=user;
    user.save();
    res.status(201).json({});
    res.end();
});

router.get('/role', async (req, res) => {
    console.log(`ROLEGET${req.sessionID}`);
    if (req.session.user !== undefined)
        res.status(201).json({response:req.session.user.role});
    else
        res.status(201).json({info:{error:"No ha iniciado sesión"}});
    res.end();
});
module.exports = router;