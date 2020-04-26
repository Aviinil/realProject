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
const helpers = require("./helpers/helpers");
const app = express();

app.use(express.urlencoded({ extended: true }));


/********************************* Fonction création nouveau utilisateur *********************************************/
function create({ username, password, firstname, lastname, email }, callback) {

  //Cryptage du mot de passe
  bcrypt.hash(password, 10, (err, encryptedPasswordHash) => {

    var keep = encryptedPasswordHash;
    // Sauvegarde de l'utilisateur en base de données
    const query = "INSERT INTO users (username, encrypted_password, firstname, lastname, email) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    utils.executeQuery(query, [username, encryptedPasswordHash, firstname, lastname, email], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        // On passe l'utilisateur crée comme paramètre de la callback
        const createdUser = result.rows[0];
        delete createdUser.encrypted_password;
        callback(undefined, createdUser);
      }
    });

  }); 
}

/********************************* Fonction d'authentification *********************************************/
function authenticate({ username, password }, callback) {
  // Vérification que l'utilisateur existe 
  // Si l'utilisateur existe pas -> Erreur 
  utils.executeQuery("SELECT * FROM users WHERE username=$1", [username], (err, result) => {
    if (err) {
      callback(true, err);
    } 

    // Si l'utilisateur existe on vérifie le mot de passe à la base de données
    else 
    {
      const userFound = result.rows[0];
      // Comparaison des mots de passe cryptés
      bcrypt.compare(password, userFound.encrypted_password, function (err, result) {
        // Si les mots de passe cryptés sont identiques
        if (result == true) {
          // Suppression du mot de passe crypté pour raison de sécurité
          delete userFound.encrypted_password; 
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