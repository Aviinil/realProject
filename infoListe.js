import React, { useState } from 'react';


export function TitreListe(props) {
    let [showForm, setShowForm] = useState(false);
    return (
        <div className="titres">
            {props.listes.map((liste, index) => {
                
                return <div key={index} className="titre-liste"> {liste.titre} 
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

/*export function InfoTache(props) {
    return (
        <div className="main__taches">
            {props.listes.map((liste, index) => {
                
                return (
                <div key={index} className="taches-liste"> 
                {liste.taches.map((tache, index) =>  <div key={index}><hr/>
                    <label className="container tache"><span className ="rayable" id={tache.id}>{tache.contenuTache}</span>
                    <input type="checkbox" className={tache.id} />
                    <span className="checkmark" onClick={() => Rayer(tache.id)}></span>
                    <span onClick={() => SupprimerTache(tache.id)}><svg width="24" height="24" className="delete-icon" fill="none" 
                    xmlns="http://www.w3.org/2000/svg" >
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"  />
                    </svg></span>
                    </label> 
                    
                </div>)}
            
                </div>
            )})}
            <hr/>
        </div>  
    ) 
}*/

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



