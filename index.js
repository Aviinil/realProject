import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { NonAuth } from './connexion.js';
import { ListeTaches } from './liste.js';
import {userValid} from './connexion'


let appElement = document.querySelector('#app');
export function init() {
    if(!userValid()) {
        //SI NON AUTHENTIFIE
        ReactDOM.render(<NonAuth />, appElement);
    }
    else {
        //SI AUTHENTIFIE
        ReactDOM.render(<ListeTaches />, appElement);
    }

}

init();

export function LogOut() {
    
    // ajouter ce qu'il faudra pour assurer une vraie deconnexion
    ReactDOM.render(<NonAuth />, appElement);
}

