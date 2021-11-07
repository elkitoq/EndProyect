

// const { getProfile } = require('../models/Profile.js');

const Mail = require('nodemailer/lib/mailer');
const { Application } = require('../models/Applications');
const { Candidate } = require('../models/candidate');
const { Company } = require('../models/Company');

// const { User } = require('../models/User.js')
const router = require('express').Router();

const { sendMail } = require('../tools/mail');

var mongoose = require('mongoose');


router.put('/mensajeApplications', async (req, res) => {
    console.log(`getMensajeApplications:${req.sessionID}`);
    console.log(req.body);

    const application = await Application.findById(req.body.application)

    const company = await Company.findOne({ "applications._id": application._id })

    if (req.session.user) {
        if (req.session.user._id) {
            var mailCounter = 0

            var mail

            for (const candidate of application.candidates.filter((e) => e.status === application.status)) {
                const cv = (await Candidate.findById(candidate.data._id)).cv
                mail = {
                    email: cv.email,
                    subject: "Mensaje de tu búsqueda de empleo",
                    html: `<div style="width: 600px !important; height: 700px !important">
                    <h1>Hola ${cv.name},</h1>
                    <p>Hay nuevas novedades sobre tu búsqueda de <a onmouseover="this.style.color='#A569BD'" onmouseout="this.style.color='#2980B9'" style="color: #2980B9;text-decoration: none; " href="http://${req.body.clientUrl}/postulates?id=${application._id}">${application.name}</a>
                    , tienes un mensaje de <a onmouseover="this.style.color='#A569BD'" onmouseout="this.style.color='#2980B9'" style="color: #2980B9;text-decoration: none; " href="http://${req.body.clientUrl}/perfilEmpresa?id=${company._id}" >${company.data.razonSocial}</a> 
                    <h4>mensaje</h4>
                   <p>${req.body.mensaje}</p>
                  </div>`
                }
                sendMail(mail);
                mailCounter++
            }
            res.status(201).json({ info: { message: `${mailCounter} Email enviados` } })
        }
        else
            res.status(201).json({ info: { error: `No tiene permiso para enviar mail en nombre de esta Búsqueda laboral` } })
    }
    else
        res.status(201).json({ info: { error: "No ha iniciado session", eventCalls: [{ eventName: "isLogOut" }] } });

});


module.exports = router;