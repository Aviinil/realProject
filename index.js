import React from 'react';
import ReactDOM from 'react-dom';
import { NonAuth } from './connexion.js';
import { ListeTaches } from './liste.js';



let appElement = document.querySelector('#app');

//SI NON AUTHENTIFIE
//ReactDOM.render(<NonAuth />, appElement);

//SI AUTHENTIFIE
ReactDOM.render(<ListeTaches />, appElement);
