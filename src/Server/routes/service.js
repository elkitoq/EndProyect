const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/service', async (req, res) => {
    console.log(`SERVICE:${req.sessionID}`);
    console.log(req.body);
    
    if (req.session.user && req.body.role) {
        const user = await User.findById(req.session.user._id);
        const role = user.role[req.body.role]
        if (role) {
            role.stalls.push(req.body)
            user.save();
        }
    }

    res.status(201).json({});
    res.end();
});

router.get('/service',async (req,res)=>{
    console.log(`getSERVICE:${req.sessionID}`);
    console.log(req.query);
    
    if (req.session.user && req.query.role) {
        const user = await User.findById(req.session.user._id);
        const role = user.role[req.query.role]
        if (role) {
            res.status(201).json({response:role.stalls});
        }
    }
    res.end();
});

module.exports = router;
