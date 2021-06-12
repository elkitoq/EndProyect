const express = require('express');
const router = express.Router();
const { sendMail } = require('../tools/mail');
const { User } = require('../models/User.js')


router.post('/recovery-pass', async (req, res) => {
    console.log(req.body);
    const email = await User.findByEmail(req.body.email);
    if (email) {
        req.session.codeRecoveryPass = Math.random();
        sendMail({
            email: req.body.email,
            subject: "Recupera tu contraseña",
            html: `<p>Aquí puedes recuperar tu <b><a href="${req.hostname}:4000/recovery-pass?code=${req.session.codeRecoveryPass}" >Contraseña</a></b></p>`
        });
        res.status(201)
    }
})

router.get('/recovery-pass', (req, res) => {
    if (req.session.codeRecoveryPass === req.params.code) {
        res.write("hola mundo");
    }
    else {
        res.write("codigo expirado reintente")
    }
    res.end();
});

router.get('/recovery', (req, res) => {
    req.session.codeRecoveryPass = Math.random();
    res.write(`<p>Aquí puedes recuperar tu <b><a href="http://${req.hostname}:4000/recovery-pass?code=${req.session.codeRecoveryPass}" >Contraseña</a></b></p>`
    )
    res.end();
});

module.exports = router;