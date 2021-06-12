const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "maipujobs@gmail.com",
        pass: "rxkybfmaagwcfgdx"
    }
});

export const sendMail = (bodyMail) => {
    transporter.sendMail({
        from: '"MaipuJobs"  maipujobs@gmail.com',
        to: bodyMail.mail,
        subject: "Recupera tu contraseña",
        html: `<p> Aquí puedes recuperar tu contraseña </p>`,
    });

   console.log("Mensaje enviado: %s" /*messageId*/);
 }