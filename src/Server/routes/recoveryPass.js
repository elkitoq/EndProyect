const express = require('express');
const router = express.Router();
const { sendMail } = require('../tools/mail');
const { User } = require('../models/User.js')


router.post('/recovery-pass', async (req, res) => {
    console.log(req.body);
    const user = await User.findByEmail(req.body.email);
    console.log(user);
    if (user) {
        user.codeRecoveryPass = Math.random();
        user.save()
        const mail = {
            email: req.body.email,
            subject: "Recupera tu contraseña",
            html: `<p><h1>Hola ${user.name},</h1><br/>
            Aquí puedes recuperar tu 
            <b><a href="http://${req.body.clientUrl}/recovery-pass?user=${user.name}&code=${user.codeRecoveryPass}" >
            Contraseña</a></b></p>`
        }
        sendMail(mail);
        res.status(201)
    }
})

router.put('/recovery-pass', async(req, res) => {
    console.log(req.body);

    const user = await User.findByName(req.body.user);

    console.log(user.codeRecoveryPass === req.body.code);
    console.log(req.body.code);
    console.log(user.codeRecoveryPass);

    if (user.codeRecoveryPass && user.codeRecoveryPass === req.body.code) {
        if (req.body["password"] === req.body["password2"]) {
            user.password=req.body.password.hashCode();
            console.log(req.body.password);
            console.log(req.body.password.hashCode());
            user.codeRecoveryPass=undefined;
            user.save()
            req.session.user = user;
            res.status(201).json({
                response: {password:"",password2:""}, 
                info: {isLogin:true,message:"Contraseña cambiada"} });
        }
        else 
            res.status(208).json({ info: { error: "Las contraseñas deben coincidir" } });
    }
    else {
        res.json({info:{
            error:"Codigo expirado o incorrecto"
        }})
    }
    res.end();
});

module.exports = router;