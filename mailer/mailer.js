const nodemailer = require('nodemailer');


async function sendEmail(destinataire, callback) {

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "todolist.dutas@gmail.com",
        pass: "DUTAS2020"
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
        html: "<p><b>Félicitations pour votre inscription</b> </p><p> Veuillez aller <a href='http://localhost:1234'>ici</></p>"
    });
    console.log("Message envoyé: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    callback(false, info);

}


module.exports = {
    sendEmail
 };
