const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/cv', async (req, res) => {
    console.log(`CV:${req.sessionID}`);
    console.log(req.session);
    console.log(req.body);
    res.status(201).json({});
    res.end();
});

router.get('/cv', async (req, res) => {
    console.log(req.session);
    res.status(201).json(req.session);
    res.end();
});
module.exports = router;