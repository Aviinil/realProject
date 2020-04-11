import { getList, createItem, deleteItem  } from './api.js';
import React, { useState, useEffect } from 'react';
import { TitreListe } from './infoListe.js';



export function ListeTaches() {
    let [showTaches, setShowTaches] = useState(false);
    let [listes, setListes] = useState([]);
    let [tacheChoisie, setTacheChoisie] = useState();

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
                <h2>Prochaines tâches</h2>
                <InfoTache listes={listes} />
            </div> 
            {showTaches ? <BarreTache tache={tacheChoisie}/> : null}
        </div>
        
    );

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
    function BarreTache(props) {
   
        
        return (
            <div className="sidebar">
                <fieldset>
                    <div>Titre</div>
                    <input type="text" name="TacheChoisie" defaultValue={props.tache.contenuTache} required></input>
                </fieldset>
                <fieldset>
                    <div>Etapes</div>
                    <input type="text" name="etape" defaultValue="en attente" required></input>
                    <input type="text" name="etape" defaultValue="en attente" required></input>
                </fieldset>
                <fieldset >
                    <div>Echéance</div>  
                    <div className="calendar">
                        <input type="date" name="date"  required></input>
                        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.333 2h-.666V.667h-1.334V2H4.667V.667H3.333V2h-.666c-.734 0-1.334.6-1.334 1.333V14c0 .733.6 1.333 1.334 1.333h10.666c.734 0 1.334-.6 1.334-1.333V3.333c0-.733-.6-1.333-1.334-1.333zm0 12H2.667V5.333h10.666V14z" fill="#000"/></svg>
                    </div>
                </fieldset>
                <fieldset>
                    <div>Note</div>  
                    <textarea type="text" cols="35" rows ="10" name="note"className="tache__text__note" ></textarea>
                </fieldset>
                <fieldset className="zone__button">
                     
                    <input type="submit" className="Button" value="Enregistrer" ></input>
                    <input type="submit" className="Button" value="Annuler" ></input>
                </fieldset>
            </div>
        )
    }   
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