import React from 'react';


export function Parametres() {
    return (

        <div className="parametres">
            <h4>Adresse e-mail</h4>
            <div className="parametres--mail-actuel"><b>Adresse e-mail actuelle :</b> mail@utilisateur.com </div>
            <div > 
                <p>
                    <label htmlFor="newEmail"> Nouvelle adresse e-mail </label>
                    <br/>
                    <input type="email" name="email" className ="input-mail" placeholder="mail@provider.com"
                        required onChange={VerifParamMail}></input>
                    <span className="erreur-connexion erreur-mail"></span>
                </p>
                <p>
                    <label htmlFor="confirmEmail"> Confirmer l'adresse e-mail </label>
                    <br/>
                    <input type="email" name="email" className ="input-mail2" placeholder="mail@provider.com" 
                    required onChange={VerifParamMail}></input>
                    <span className="erreur-connexion erreur-mail2"></span>
                    <span className="erreur-connexion mail-different"></span>
                </p>
                <p>
                    <input type="submit" value ="Modifier l'adresse e-mail" className="Button" onClick={ChangerMail}></input>
                </p>
            </div>

            <h4>Mot de passe </h4>
            <div > 
                <p>
                    <label htmlFor="currentMdp">Mot de passe actuel </label>
                    <br/>
                    <input type="password" name="currentPassword" className ="input-current-mdp" placeholder="password"
                        required onChange={VerifParamMdp}></input>
                    <span className="erreur-connexion erreur-current-mdp"></span>
                </p>
                <p>
                    <label htmlFor="newEmail"> Nouvelle mot de passe </label>
                    <br/>
                    <input type="password" name="newPassword" className ="input-new-mdp" placeholder="password"
                        required onChange={VerifParamMdp}></input>
                    <span className="erreur-connexion erreur-new-mdp"></span>
                </p>
                <p>
                    <label htmlFor="confirmEmail"> Confirmer le nouveau mot de passe </label>
                    <br/>
                    <input type="password" name="newPassword2" className ="input-new-mdp2" placeholder="password"
                    required onChange={VerifParamMdp}></input>
                    <span className="erreur-connexion erreur-new-mdp2"></span>
                    <span className="erreur-connexion mdp-different"></span>
                </p>
                <p>
                    <input type="submit" value ="Modifier le mot de passe" className="Button" onClick={ChangerMdp}></input>
                </p>
            </div>


        </div>

    )  
}

function VerifParamMail() {
    let inputMail = document.querySelector('.input-mail');
    let inputMail2 = document.querySelector('.input-mail2');
    let mail = document.querySelector('.erreur-mail');
    if(inputMail.value == "")
        mail.innerHTML="Veuillez renseigner une adresse e-mail";
    else 
        mail.innerHTML="";
    let mail2 = document.querySelector('.erreur-mail2');
    if(inputMail2.value == "")
        mail2.innerHTML="Veuillez renseigner une adresse e-mail";
    else 
        mail2.innerHTML="";
    
}

function ChangerMail() {
    let inputMail = document.querySelector('.input-mail');
    let inputMail2 = document.querySelector('.input-mail2');
    let erreurMail = document.querySelector('.mail-different');
    if(inputMail.value !== inputMail2.value) {
        erreurMail.innerHTML ="Les adresses mails ne correspondent pas"
    }
}

function VerifParamMdp() {
    /*let currentMdp = document.querySelector('.input-current-mdp');
    // verifier que le mdp actuel est bien le bon. fetch ?
    // message d'erreur dans .erreur-current-mdp
*/
    let mdp = document.querySelector('.erreur-new-mdp');
    let inputMdp = document.querySelector('.input-new-mdp');
    if(inputMdp.value === "")
        mdp.innerHTML="Veuillez renseigner un mot de passe";
    else 
        mdp.innerHTML=""  ;
    let mdp2 = document.querySelector('.erreur-new-mdp2');
    let inputMdp2 = document.querySelector('.input-new-mdp2');
    if(inputMdp2.value === "")
        mdp2.innerHTML="Veuillez renseigner un mot de passe";
    else 
        mdp2.innerHTML=""  ;
}

function ChangerMdp() {
    let inputMdp = document.querySelector('.input-new-mdp');
    let inputMdp2 = document.querySelector('.input-new-mdp2');
    let erreurMdp = document.querySelector('.mdp-different');
    if(inputMdp.value !== inputMdp2.value) {
        erreurMdp.innerHTML ="Les mots de passe ne correspondent pas"
    }
}