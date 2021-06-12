const express = require('express');
const router = express.Router();
const { sendMail } = require('../tools/mail');


router.post('/recovery-pass', async function (req, res) {
    console.log(req.body);
    const email = await User.findUserByEmail(req.body.email);
    if(email){
        sendMail(req.body.email);
    }
})

module.exports = router;