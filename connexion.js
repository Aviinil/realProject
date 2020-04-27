import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
import { authentifier, inscrire } from './api';
import { init } from './index';

const jwt = require('jsonwebtoken');

let validUser ;  

export function NonAuth() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Connexion />
                </Route>
                <Route path="/inscription">
                    <Inscription />
                </Route>
                <Route path='/mdpOublie'>
                    <MdpOublie />
                </Route>

            </Switch>

        </Router>

    );


}


// IL FAUT MODIFIER L ACTION DANS CONNEXION ET INSCRIPTION DANS LES FORM LORSQU'ON SAURA LA ROUTE
function Connexion() { 
    return (
        
            <div className="container-fluid">
                <div className="container__connexion">
                    
                    
                        <p>
                            <label htmlFor="email"> Adresse e-mail </label>
                            <br/>
                            <input type="email" name="email" className ="input-mail" placeholder="mail@provider.com"
                             required onChange={VerifierMail}></input>
                            <span className="erreur-connexion erreur-connexion-mail"></span>
                        </p>
                        <p>
                            <label htmlFor="mdp"> Mot de passe </label>
                            <br/>
                            <input type="password" name="password" className ="input-mdp" placeholder="password" 
                            required onChange={VerifierMdp}></input>
                            <span className="erreur-connexion erreur-connexion-mdp"></span>
                        </p>
                        <p>
                            <input type="submit" value="Connexion" className="Button" onClick={VerifierIdentifiants}></input>
                        </p>
                    
                
                    <div className="div__links"><Link className="links" to="/mdpOublie">J'ai oublié mon mot de passe.</Link></div>
                    <br/>
                    <div className="div__links"><Link className="links" to="/inscription">Pas encore de compte ? Inscrivez-vous !</Link></div>
                </div>
            </div>
        
        
    );

   
}

function Inscription() {

        return (
            <div className="container-fluid">
                <div className="container__connexion">
                    
                    
                        <p>
                            <label htmlFor="email"> Adresse e-mail </label>
                            <br/>
                            <input type="email" name="email" className ="input-mail" placeholder="mail@provider.com" 
                            required onChange={VerifierMail}></input>
                            <span className="erreur-connexion erreur-connexion-mail"></span>
                        </p>
                        <p>
                            <label htmlFor="mdp"> Mot de passe </label>
                            <br/>
                            <input type="password" name="password" className ="input-mdp" placeholder="password" 
                            required onChange={VerifierMdp}></input>
                            <span className="erreur-connexion erreur-connexion-mdp"></span>
                        </p>
                        <p>
                            <label htmlFor="mdpbis"> Répéter le mot de passe </label>
                            <br/>
                            <input type="password" name="passwordRepeat" className ="input-repmdp" placeholder="password" 
                            required onChange={mdpDifferents}></input>
                            <span className="erreur-connexion erreur-connexion-repmdp"></span>
                        </p>
                        <p>
                            <input type="submit" value="Inscription" className="Button" onClick={InscriptionEnCours}></input>
                            <span className="completed"></span>
                        </p>
                    
                
                </div>
            </div>

        );
}

function MdpOublie() {
    return <div> VA FALLOIR CONSTRUIRE CA </div>

}

export function VerifierMail() {
    let mail = document.querySelector('.erreur-connexion-mail');
    let inputMail = document.querySelector('.input-mail');
    if(inputMail.value == "")
        mail.innerHTML="Veuillez renseigner une adresse e-mail";
    else 
        mail.innerHTML=""
}

function VerifierMdp() {
    let mdp = document.querySelector('.erreur-connexion-mdp');
    let inputMdp = document.querySelector('.input-mdp');
    if(inputMdp.value == "")
        mdp.innerHTML="Veuillez renseigner un mot de passe";
    else 
        mdp.innerHTML=""  ;  
}

async function VerifierIdentifiants() {

    // verifier les identifiants, fetch and shit, rajouter l'async/await
    let inputMail = document.querySelector('.input-mail').value;
    let inputMdp = document.querySelector('.input-mdp').value;
    let reponse = await authentifier(inputMail, inputMdp)

    //si identifiants non reconnus
    if (reponse.token === undefined) {
        let spanWrongId = document.querySelector('.erreur-connexion-mdp');
        spanWrongId.innerHTML = "Identifiants incorrects";
        spanWrongId.style.textAlign = "center";
    }
    try {
    let decoded = jwt.verify(reponse.token, "bobfoo42")
        validUser = true;
        console.log(validUser)
        init();

    } catch(err) {
        validUser = false;
        console.log(err)
        init();
    }
   

    

}
export function userValid() {
    console.log(validUser)
    return validUser;
}
function mdpDifferents() {
    let inputMdp = document.querySelector('.input-mdp');
    let inputMdpBis = document.querySelector('.input-repmdp');
    let repMdp = document.querySelector('.erreur-connexion-repmdp');
    let button = document.querySelector('.Button');
    if (inputMdp.value != inputMdpBis.value) {
        repMdp.innerHTML="Les mots de passe ne correspondent pas"
        button.disabled = true;
    }
    else {
        repMdp.innerHTML=""
        button.disabled = false;
    }
}

// voir plus en détail comment on fera, fetch and shit
async function InscriptionEnCours() {

    let inputMail = document.querySelector('.input-mail').value;
    let inputMdp = document.querySelector('.input-mdp').value;
    let reponse = await inscrire(inputMail, inputMdp)
    // A faire :
    // si mail est déjà enregistré
    
    let mail = document.querySelector('.erreur-connexion-mail');
    mail.innerHTML="Cette adresse e-mail est déjà utilisée";
    //mail envoyé si reussi
    let mailE = document.querySelector('.completed');
    mailE.innerHTML="Un mail de confirmation vous a été envoyé";
    
    history.replaceState(null, null, 'http://localhost:1234');
    window.location.reload();
    
}
