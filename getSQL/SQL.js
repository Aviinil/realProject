const utils = require("../bdd/utils");

// Fonction utilisable par l'exterieur
module.exports = {
    getTachesFromListe,
    getListesFromUtilisateur
  };

/* Fonction qui recupere les taches d'une liste precise à partir d'une "IDlistes" */
function getTachesFromListe(IDlistes, callback) {
    const query = "SELECT * FROM taches WHERE IDlistes=$1";
    utils.executeQuery(query, [IDlistes], (err, result) => {
      if (err) {
        callback(true, err);
      } else if (result.rows.length === 0) {
        callback(true, `Impossible de retrouver les taches de ${IDlistes}`);
      } else {
        callback(undefined, result.rows[0]);
      }
    });
  }
  
  /* Fonction qui ajoute une tache dans une liste precise à partir d'une "IDlistes" */
  function addTachesToListe({ IDtaches, contenuTache, IDlistes }, callback) {
    const query = "INSERT INTO projects (IDtaches, contenuTache, IDlistes) VALUES ($1, $2, $3)";
    utils.executeQuery(query, [IDtaches, contenuTache, IDlistes], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        callback(undefined, result.rows[0]);
      }
    });
  }
  
  /* Fonction qui recupere les listes d'un utilsateur precis à partir d'un "IDutilisateurs" */
  function getListesFromUtilisateur(IDutilisateurs, callback) {
    const query = "SELECT * FROM listes WHERE IDutilisateurs=$1";
    utils.executeQuery(query, [IDutilisateurs], (err, result) => {
      if (err) {
        callback(true, err);
      } else if (result.rows.length === 0) {
        callback(true, `Impossible de retrouver les listes de ${IDutilisateurs}`);
      } else {
        callback(undefined, result.rows[0]);
      }
    });
  }