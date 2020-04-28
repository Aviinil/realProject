const utils = require("../bdd/utils");
const nodemailer = require('nodemailer');

async function sendEmail({from, toArray, subject, text, html}, callback) {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: testAccount.user, 
            pass: testAccount.pass 
        }
    });

    /*****   todolist.dutas@gmail.com     m2p: DUTAS2020    ***/
    let info = await transporter.sendMail({
        from: 'todolist.dutas@gmail.com ', 
        to: "", // list of receivers
        subject: "Confirmation d'inscription", 
        text: "Bonjour, nous vous confirmons vos inscription", 
        html: "<b>Bonjour, nous vous confirmons vos inscription</b>"
    });
    console.log("Message envoyé: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    callback(false, info);

}
module.exports = {
    sendEmail
 };



 /*************A COUPER COLLER DANS API.JS ****************/


 const mailerServices = require("../mailer");

 router.get('/email', (req, res, next) => {
    mailerServices.sendEmail({}, (err, result) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.json({ message: 'Message sent: ' + result.response });
  
    });
  });