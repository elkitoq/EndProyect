const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/job', async (req, res) => {
    console.log(`JOB:${req.sessionID}`);
    console.log(req.body);
    
    if (req.session.user && req.body.role) {
        const user = await User.findById(req.session.user._id);
        const role = user.role[req.body.role]
        if (role) {
            role.applications.push(req.body)
            user.save();
        }
    }

    res.status(201).json({});
    res.end();
});

router.get('/job',async (req,res)=>{
    console.log(`getJOB:${req.sessionID}`);
    console.log(req.query);
    
    if (req.session.user && req.query.role) {
        const user = await User.findById(req.session.user._id);
        const role = user.role[req.query.role]
        if (role) {
            res.status(201).json({response:role.applications});
        }
    }
    res.end();
});

module.exports = router;
