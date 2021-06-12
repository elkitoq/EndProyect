const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "maipujobs@gmail.com",
        pass: "rxkybfmaagwcfgdx"
    }
});

const sendMail = (bodyMail) => {
    transporter.sendMail({
        from: '"MaipuJobs"  maipujobs@gmail.com',
        to: bodyMail.email,
        subject: bodyMail.subject,
        html: bodyMail.html,
    });
    console.log("Mensaje enviado: %s" /*messageId*/);
}

module.exports = { sendMail };
