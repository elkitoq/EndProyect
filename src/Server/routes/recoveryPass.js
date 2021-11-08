const express = require('express');
const router = express.Router();
const { sendMail } = require('../tools/mail');
const { User } = require('../models/User.js')


router.post('/recovery-pass', async (req, res) => {
    console.log('post/recovery-pass');

    if (req.body.email)
        req.body.email = req.body.email.toLowerCase()


    if (req.body.user)
        req.body.user = req.body.user.toLowerCase()

    const user = await User.findByEmail(req.body.email) || await User.findByName(req.body.name);
    if (user) {
        user.codeRecoveryPass = Math.random();
        user.save()
        const mail = {
            email: user.email,
            subject: "Recupera tu contraseña",
            // html: `<p><h1>Hola ${user.name},</h1><br/>
            // Aquí puedes recuperar tu 
            // <b><a href="http://${req.body.clientUrl}/recovery-pass?user=${user.name}&code=${user.codeRecoveryPass}" >
            // Contraseña</a></b></p>`
            html: `<div class="content-email" style="width: 600px !important; heigth:750px !important">
            <h1>Hola, ${user.name}:</h1>
          
          <p>Alguien solicitó una nueva contraseña para la cuenta asociada con ${user.email}.</p>
          
            <p>Aún no se han realizado cambios en su cuenta.</p>
          
            <p>Puede restablecer su contraseña haciendo click en el enlace a continuación: </p><a href="http://${req.body.clientUrl}/recovery-pass?user=${user.name}&code=${user.codeRecoveryPass}"> Restablecer Contraseña</a>
          
          <p>Si no solicitó una nueva contraseña, háganoslo saber de inmediato respondiendo a este correo electrónico.</p>
          
          <h5>Att.
          El equipo de MaipuJobs</h5>
          </div>`
        }
        sendMail(mail);
        res.status(201).json({ info: { message: `Email enviado a ${user.email.substring(0, 4)}***${user.email.substring(user.email.indexOf("@"))}, revise su correo` } })
    } else
        res.status(208).json({ info: { error: "La dirección de correo no figura en nuestra DB" } })
    res.end()
})

router.put('/recovery-pass', async (req, res) => {
    console.log('put/recovery-pass');
    const user = await User.findByName(req.body.user);

    if (user.codeRecoveryPass && user.codeRecoveryPass === req.body.code) {
        if (req.body["password"] === req.body["password2"]) {
            user.password = req.body.password.hashCode();
            console.log(req.body.password);
            console.log(req.body.password.hashCode());
            user.codeRecoveryPass = undefined;
            user.save()
            req.session.user = user;
            res.status(201).json({
                response: { password: "", password2: "" },
                info: { isLogin: true, eventCalls: [{ eventName: "isLogin" }], message: "Contraseña cambiada" }
            });
        }
        else
            res.status(208).json({ info: { error: "Las contraseñas deben coincidir" } });
    }
    else {
        res.json({
            info: {
                error: "Codigo expirado o incorrecto"
            }
        })
    }
    res.end();
});

module.exports = router;