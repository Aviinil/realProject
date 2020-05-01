import { CloseTask} from './mobile'
import { getEtapes, createEtape, deleteEtape, updateEtape, modifierTache } from './api'
import { useState, useEffect } from 'react';


export function BarreTache(props) {

    let [etapesTache, setEtapesTache] = useState([])
    useEffect(() => {
        async function fetchEtapes(props) {
            let etapes = await getEtapes(props.tache.idtache);
            setEtapesTache(etapes)
            
        }
       
        fetchEtapes(props)
    }, [])
    
    //pas top mais pour passer du format dd/mm/yyy à yyy-mm-dd
    let jourTache = props.tache.echeance.split('/')[0];
    let moisTache =props.tache.echeance.split('/')[1];
    let anneeTache =props.tache.echeance.split('/')[2]
    let dateTache = `${anneeTache}-${moisTache}-${jourTache}`
    
    return (
        <div className="sidebar right-sidebar">
            <fieldset>
                <div className="close-mobile close-task-mobile" onClick={CloseTask}> &times;</div>
                <div>Titre</div>
                <input type="text" name="TacheChoisie" defaultValue={props.tache.contenutache} required></input>
            </fieldset>
            <fieldset >
                <div>Etapes</div>
                

                    {etapesTache.map((etape,index) => 
                        <div key={index} className="etapes" >
                            <div className="tache-etapes">
                                <input type="checkbox" id={etape.idetape} defaultChecked={etape.checked ? true:false} onChange={()=>checkEtape(etape.idetape)} />
                                <input type="text" className="input-etapes" name="etape" readOnly value={etape.contenuetape} required></input>
                            </div >
                            
                            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=> FonctionDeleteEtape(etape)}>
                            <path d="M4.667 7.333v1.334h6.666V7.333H4.667zm3.333-6A6.67 6.67 0 001.333 8 6.67 6.67 0 008 14.667 6.67 6.67 0 0014.667 8 6.669 6.669 0 008 1.333zm0 12A5.34 5.34 0 012.667 8 5.34 5.34 0 018 2.667 5.34 5.34 0 0113.333 8 5.34 5.34 0 018 13.333z" fill="#D63031"/></svg>
                            
                        </div>
                    )}
                    
                <div className="etapes ajout-etape" >
                    <div className="tache-etapes">  
                        <input type="checkbox"  />  
                        <input type="text" className="input-etapes" name="ajout-etape" placeholder="Nouvelle étape" onKeyPress={()=> AjoutEtapeE(event, props.tache.idtache)} ></input>
                    </div>
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=> AjoutEtape(props.tache.idtache)}>
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#000"/></svg>
                    </div>
            </fieldset>
            <fieldset >
                <div>Echéance</div>  
                <div className="calendar">
                    <input type="date" name="date" defaultValue={dateTache} required></input>
                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.333 2h-.666V.667h-1.334V2H4.667V.667H3.333V2h-.666c-.734 0-1.334.6-1.334 1.333V14c0 .733.6 1.333 1.334 1.333h10.666c.734 0 1.334-.6 1.334-1.333V3.333c0-.733-.6-1.333-1.334-1.333zm0 12H2.667V5.333h10.666V14z"/></svg>
                </div>
            </fieldset>
            <fieldset>
                <div>Note</div>  
                <textarea type="text" cols="35" rows ="10" name="noteTache" defaultValue={props.tache.note} className="tache__text__note" ></textarea>
            </fieldset>
            <fieldset className="zone__button">
                 
                <input type="submit" className="Button" value="Enregistrer" onClick={()=> modifTache(props.tache.idtache)} ></input>
                <input type="submit" className="Button" value="Annuler" onClick={CloseTask}></input>
            </fieldset>
        </div>
    )
    async function AjoutEtapeE(e, props) {
        if (e.keyCode == 13) {
            let texteEtape = document.querySelector('input[name="ajout-etape"]');
            if (texteEtape.value.replace(/ /g, '') !== '') {
                let etapeAAjouter = {
                    idtache: props,
                    contenuetape: texteEtape.value
                }
                let reponse = await createEtape(etapeAAjouter);
                setEtapesTache(prevEtapes => [...prevEtapes, reponse])
                texteEtape.value="";
            }
        }
    }
    async function AjoutEtape(props) {
        
        let texteEtape = document.querySelector('input[name="ajout-etape"]');
        if (texteEtape.value.replace(/ /g, '') !== '') {
            let etapeAAjouter = {
                idtache: props,
                contenuetape: texteEtape.value
            }
            let reponse = await createEtape(etapeAAjouter);
            setEtapesTache(prevEtapes => [...prevEtapes, reponse])
            texteEtape.value="";
        }
    }

    async function FonctionDeleteEtape(props) {
 
        let idetape = {
            idetape: props.idetape
        }
        let reponse = await deleteEtape(idetape);
        let etapes = await getEtapes(props.idtache);
        setEtapesTache(etapes)
    }
    async function modifTache(props) {
        //update la tache
        let date = document.querySelector('input[name="date"]').value
        let intitule = document.querySelector('input[name="TacheChoisie"]').value
        let newNote = document.querySelector(('[name="noteTache"]')).value
        let annee = date.split('-')[0];
        let mois =date.split('-')[1];
        let jour =date.split('-')[2]
        let dateTache = `${jour}/${mois}/${annee}`

        let tacheModifications = {
            contenutache: intitule,
            idtache: props,
            echeance: dateTache,
            note: newNote
        }
        let reponse = await modifierTache(tacheModifications)
        let etapes = await getEtapes(props);
        setEtapesTache(etapes)
        CloseTask();
        
    }
}   


async function checkEtape(props) {
    // a gérer quand on check les étapes
    let check = document.getElementById(`${props}`).checked;

    let etape = {
        idetape: props,
        checked: check
    }
    let reponse = await updateEtape(etape);
    
}

