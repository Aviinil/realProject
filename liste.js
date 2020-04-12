import { getList, createItem, deleteItem  } from './api.js';
import React, { useState, useEffect } from 'react';
import { BarreTache } from './infoListe.js';
import Modal from 'react-bootstrap/Modal';


export function ListeTaches() {
    let [showTaches, setShowTaches] = useState(false);
    let [listes, setListes] = useState([]);
    let [tacheChoisie, setTacheChoisie] = useState();
    let [detailListe, setDetailListe] = useState();

    useEffect(() => {
        async function fetchList() {
            let liste = await getList()
        
            setListes(liste)
        }
    
        fetchList()
    }, [])
    
    
    /*function handleSuccess() {
        //en cas d'ajout d'une nouvelle liste / taches

    }*/
 
    return (
        
        <div className="container__accueil">
            <div className="sidebar">
                <div className="menu__top">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill="#FF7675"/></svg>
                    <span> mail@utilisateur.com</span>
                </div> 
                <h6 className="sidebar_liste"> Mes listes </h6>
                <TitreListe listes={listes} />
            </div>     
                
            <div className="main">
                {(detailListe == null) ? 
                <>
                <h2>Prochaines tâches</h2>
                <InfoTache listes={listes} />
                </>
                :
                <>
                <FocusListe liste={detailListe} /> 
                </>
            }
            </div> 
            {showTaches ? <BarreTache tache={tacheChoisie}/> : null}
        </div>
        
    );

    function TitreListe(props) {
        let [showForm, setShowForm] = useState(false);
        return (
            <div className="titres">
                {props.listes.map((liste, index) => {
                    
                    return <div key={index} className="titre-liste" onClick={() =>setDetailListe(liste)}> {liste.titre} 
                    <span className="compteur"> {liste.taches.length}
                        </span></div>
                })}
                {showForm ? <NouvelleListe /> : null}
                <div className="titre-liste" onClick={() => setShowForm(true)}>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#000" /></svg>
                    <h6 >Nouvelle liste</h6>
                </div>
            </div>   
        )
    }

    function InfoTache(props) {
        return (
            <div className="main__taches">
                {props.listes.map((liste, index) => {
                    
                    return (
                    <div key={index} className="taches-liste"> 
                    {liste.taches.map((tache, index) =>  
                        <div key={index} className="taches-liste-unique">
                            <input type="checkbox" className={tache.id} onChange={() => Rayer(tache.id)} />
                            <div className="tache-unique" id={tache.id}>
                            <div className="container-nom-tache"onDoubleClick={showTaches ? () =>setShowTaches(false): () =>setShowTaches(true)} onClick={ () => setTacheChoisie(tache) }>{tache.contenuTache}</div>

                            <div className="delete-div" onClick={() => SupprimerTache(tache.id)}><svg width="24" height="24" className="delete-icon" fill="none" 
                            xmlns="http://www.w3.org/2000/svg" >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"  />
                            </svg></div>
                            
                            </div>                          
                        </div>
                    )}
                
                    </div>
                )})}
               <div className="tache-finale"></div> 
            </div>  
        ) 
    }

function FocusListe(props) {
    // onsubmit input ajout tache et onclick le +, rajouter une tache ds la DB, avec données vides si ce n'est le titre
    return (
        <>
            <div className="header-edition-liste">
                <h2>{props.liste.titre}</h2>
                        <div className="suppression-definitive" onClick={() => ModalSuppr(props)}>
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z" fill="#fff"/>
                        </svg> Supprimer la liste
                        </div>
            </div>
            <div className="taches-liste"> 
                {props.liste.taches.map((tache, index) =>  
                    <div key={index} className="taches-liste-unique">
                        <input type="checkbox" className={tache.id} onChange={() => Rayer(tache.id)} />
                        <div className="tache-unique" id={tache.id}>
                        <div className="container-nom-tache"onDoubleClick={showTaches ? () =>setShowTaches(false): () =>setShowTaches(true)} onClick={ () => setTacheChoisie(tache) }>{tache.contenuTache}</div>

                        <div className="delete-div" onClick={() => SupprimerTache(tache.id)}><svg width="24" height="24" className="delete-icon" fill="none" 
                        xmlns="http://www.w3.org/2000/svg" >
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"  />
                        </svg></div>
                        
                        </div>                          
                    </div>
                )}
                
                    <div id="myModal" class="modal">

                    
                    <div class="modal-content">
                        
                        <h4>Supprimer la liste ?</h4>
                        <p>Après avoir été supprimée, une liste ne peut pas être récupérée.
                        Êtes-vous certain(e) de vouloir supprimer la liste "{props.liste.titre}" </p>
                        <div className="delete-buttons">
                            <div className="suppression-definitive" onClick={fonctionFetchDelete}>
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z" fill="#fff"/>
                            </svg> Supprimer la liste
                            </div>
                            <div className="annuler" >
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#fff"/>
                            </svg> Annuler
                            </div>
                        </div>
                    </div>

                    </div>
                <div className="taches-liste-unique ajout-tache">
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#000"/></svg>
                    <div> <input type="text" name="ajouter-tache" placeholder="Ajouter une tâche ..." required></input></div>   
                </div>
                <div className="tache-finale"></div>
            </div>
        </>
    )

}
   
}
function fonctionFetchDelete() {

}
function ModalSuppr(props) {
  
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    var close = document.getElementsByClassName("annuler")[0];
    close.onclick = function() {
        modal.style.display = "none";
      }
}


function NouvelleListe() {
    // call a l'api pour créer une nouvelle liste puis rediriger vers la page d edition de la liste
    return (
        <div className="container__connexion">
            
            <form method="post" action="/d"> 
                <p>
                
                    <input type="text" name="nouvelleListe" placeholder="Intitulé de la liste" required></input>
                </p>
            </form>
        
            
        </div>
    )
}

function Rayer(index) {
    // ajouter l'information dans la DB
    let texte = document.getElementById(index);
    let checkbox = document.getElementsByClassName(index);
    
    if (checkbox[0].checked == true) {
        texte.style.textDecoration ="line-through";
        texte.style.color = 'grey';
    } else {
        texte.style.textDecoration ="none"; 
        texte.style.color = 'black';
    }

}

function SupprimerTache(index) {
    // Rayer et supprimerTache semble etre appelé en même temps, mais si on suppr, ca devrait pas être grave
    let texte = document.getElementById(index);

}