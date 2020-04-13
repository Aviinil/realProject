import { getList, createItem, deleteItem  } from './api.js';
import React, { useState, useEffect } from 'react';
import { BarreTache } from './infoListe.js';
import { Parametres } from './parametres.js'
import { LogOut} from './index'


export function ListeTaches() {
    let [showTaches, setShowTaches] = useState(false);
    let [listes, setListes] = useState([]);
    let [tacheChoisie, setTacheChoisie] = useState();
    let [detailListe, setDetailListe] = useState();
    let [showParam, setShowParam] = useState(false);
    useEffect(() => {
        async function fetchList() {
            let liste = await getList()
        
            setListes(liste)
        }
    
        fetchList()
    }, [])
    
    function Home() {
        // retour à l'ecran d'accueil en cliquant sur la petite maison sidebar top
        setShowParam(false);
        setShowTaches(false);
        setDetailListe(null);
    }
    /*function handleSuccess() {
        //en cas d'ajout d'une nouvelle liste / taches

    }*/
 
    return (
        
        <div className="container__accueil">
            <div className="sidebar">
                <div className="menu__top">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" onClick={Home}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill="#FF7675"/></svg>
                    <span> mail@utilisateur.com</span>
                </div> 
                <h6 className="sidebar_liste"> Mes listes </h6>
                <TitreListe listes={listes} />
                <div className="sidebar-bottom">
                    <div className="param-logout-link" onClick={() => setShowParam(true)}>
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.14 12.936c.036-.3.06-.612.06-.936 0-.324-.024-.636-.072-.936l2.028-1.584a.496.496 0 00.12-.612l-1.92-3.324a.488.488 0 00-.588-.216l-2.388.96a7.03 7.03 0 00-1.62-.936l-.36-2.544a.479.479 0 00-.48-.408h-3.84a.467.467 0 00-.468.408l-.36 2.544a7.218 7.218 0 00-1.62.936l-2.388-.96a.475.475 0 00-.588.216l-1.92 3.324a.465.465 0 00.12.612l2.028 1.584c-.048.3-.084.624-.084.936 0 .312.024.636.072.936L2.844 14.52a.496.496 0 00-.12.612l1.92 3.324c.12.216.372.288.588.216l2.388-.96a7.03 7.03 0 001.62.936l.36 2.544c.048.24.24.408.48.408h3.84c.24 0 .444-.168.468-.408l.36-2.544a7.219 7.219 0 001.62-.936l2.388.96c.216.084.468 0 .588-.216l1.92-3.324a.465.465 0 00-.12-.612l-2.004-1.584zM12 15.6A3.61 3.61 0 018.4 12c0-1.98 1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="#FF7675"/></svg>
                        <h6>Paramètres</h6>
                    </div>
                    <div className="param-logout-link" onClick={LogOut}>
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0119 12c0 3.87-3.13 7-7 7A6.995 6.995 0 017.58 6.58L6.17 5.17A8.932 8.932 0 003 12a9 9 0 0018 0c0-2.74-1.23-5.18-3.17-6.83z" fill="#FF7675"/></svg>
                        <h6>Déconnexion</h6>
                    </div>
                </div>
            </div>     
                
            <div className="main">
                {showParam ?
                <>
                <h2>Paramètres</h2>
                <Parametres/>
                </>
                :
                (detailListe == null) ? 
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
                        <div className="suppression-definitive" onClick={ShowModalSuppr}>
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
                
                <div id="myModal" className="modal">
                    <div className="modal-content">
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
    // api suppression de la liste
}
function ShowModalSuppr(props) {
    
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

