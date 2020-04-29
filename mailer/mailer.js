const nodemailer = require('nodemailer');

async function sendEmail(destinataire, callback) {
    let transporter = nodemailer.createTransport({
        host: "Gmail",
        auth: {
            user: "todolist.dutas@gmail.com", // Bon on reflechira apres pour proteger les logins
            pass: "DUTAS2020"  
        }
    });

    /*****   todolist.dutas@gmail.com     m2p: DUTAS2020    ***/
    let info = await transporter.sendMail({
        from: 'todolist.dutas@gmail.com ', 
        to: destinataire,
        subject: "Confirmation d'inscription", 
        text: "Projet Web Saïd/Clement/Jacky", 
        html: "<b>Ceci est un test</b>"
    });
    console.log("Message envoyé: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    callback(false, info);

}
module.exports = {
    sendEmail
 };
