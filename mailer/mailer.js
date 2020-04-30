const nodemailer = require('nodemailer');


async function sendEmail(destinataire, callback) {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      },
      tls: {
          rejectUnauthorized: false
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

sendEmail().catch(console.error);

module.exports = {
    sendEmail
 };
