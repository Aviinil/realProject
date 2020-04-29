/**
 - Appels (require...)
 - Fonction create()
 - Fonction authentificate()
 - Token
 - Export modules
 **/


/***************************************** Appels *********************************************/
//const utils = require("../db/utils");
const bcrypt = require('bcrypt');
const express = require("express");
const session = require("express-session");
const app = express();
const utils = require("./bdd/utils");
const mailer = require("./mailer/mailer");
app.use(express.urlencoded({ extended: true }));


/********************************* Fonction création nouveau utilisateur *********************************************/
function create( email, password, callback) {

  //Cryptage du mot de passe
  bcrypt.hash(password, 10, (err, encryptedPasswordHash) => {

    var keep = encryptedPasswordHash;
    // Sauvegarde de l'utilisateur en base de données
    const query = "INSERT INTO utilisateur (IDutilisateur, email, secured_password) VALUES (nextval('SeqIDutilisateur'), $1, $2) RETURNING *";
    utils.executeQuery(query, [email, encryptedPasswordHash], (err, result) => {
      if (err) {
        callback(true, err);
        console.log(err)
        console.log(result)
      } else {
        // On passe l'utilisateur crée comme paramètre de la callback
        const createdUser = result.rows[0];
        delete createdUser.encrypted_password;
        callback(undefined, createdUser);
      }
    });

  });
  mailer.sendEmail(email, (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      return 0;
    }
  });
}

/********************************* Fonction d'authentification *********************************************/
function authenticate( email, password , callback) {
  // Vérification que l'utilisateur existe 
  // Si l'utilisateur existe pas -> Erreur 
  const query = "SELECT * FROM utilisateur WHERE email=$1";
  utils.executeQuery(query, [email], (err, result) => {
    if (err) {
      callback(true, err);
    } 

    // Si l'utilisateur existe on vérifie le mot de passe à la base de données
    else 
    {
      const userFound = result.rows[0];
      // Comparaison des mots de passe cryptés
      bcrypt.compare(password, userFound.secured_password, function (err, result) {
        // Si les mots de passe cryptés sont identiques
        if (result == true) {
          // Suppression du mot de passe crypté pour raison de sécurité
          delete userFound.secured_password; 
          callback(false, userFound);
           // Si les mots de passe cryptés sont différent on affiche un message 
        } else {
          callback(true, 'Incorrect password');
        }
      });
    }  
  });
}

/********************************* TOKEN *********************************************/
const sessionParams = {
  secret: "",
  maxAge: 24 * 60 * 60 * 1000
};
app.use(session(sessionParams));

// Middleware custom: executé pour chaque nouvelle requete HTTP
app.use((req, res, next) => {
  // Si l'ulisateur est authentifié
  if (req.session && req.session.userId) {
    res.locals.username = req.session.username;
    res.locals.isAuthentificated = true;
  }

  // Si un infoMessage à été ajouté
  if (req.session && req.session.infoMessage) {
    res.locals.infoMessage = req.session.infoMessage;
    req.session.infoMessage = null;
  }
  next();
});

/********************************* Export modules *********************************************/
module.exports = {
  create,
  authenticate
};