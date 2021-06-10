const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/cv', async (req, res) => {
    console.log(`CV:${req.sessionID}`);
    console.log(req.session);
    console.log(req.body);
    if (req.session.user) {
        const user = await User.findById(req.session.user._id);
        const role = user.role[req.body.role]
        if (role) {
            role.cv = req.body
            user.save();
        }
    }
    else {
        req.session.cv = req.body
    }
    res.status(201).json({});
    res.end();
});

router.get('/cv', async (req, res) => {
    console.log(`getCV:${req.sessionID}`);
    console.log(req.query);
    if (req.session.user && req.query.role >= 0) {
        const user = await User.findById(req.session.user._id);
        const cv = {}
        Object.assign(cv,user.role[req.query.role].cv)
        cv.role=req.query.role;
        res.status(201).json({ response: cv});
    }
    else
        res.status(201).json({ response: req.session.cv });
    res.end();
});
module.exports = router;