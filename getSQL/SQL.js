const utils = require("../bdd/utils");

// Fonction utilisable par l'exterieur
module.exports = {
    addListeToUtilisateur,
    getListesFromUtilisateur,
    deleteListe,
    addTachesToListe,
    getTachesFromListe,
    deleteTache
  };

/* Fonction qui créer une liste pour un utilisateur precis à partir d'un "IDutilisateurs" */
function addListeToUtilisateur(IDlistes, titre, content, IDutilisateurs, callback) {
  const query = "INSERT INTO listes(IDlistes, titre, content, IDutilisateurs) VALUES ($1, $2, $3, $4);";
  utils.executeQuery(query, [IDlistes, titre, content, IDutilisateurs], (err, result) => {
    if (err) {
      callback(true, err);
    } else if (result.rows.length === 0) {
      callback(true, `Impossible de retrouver l'utilisateur ${IDutilisateurs}`);
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
/* Fonction qui supprime une listes à partir d'un "IDlistes" */
function deleteListe(IDlistes, callback) {
  const query = "DELETE FROM listes WHERE IDlistes=$1";
  utils.executeQuery(query, [IDlistes], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined);
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
/* Fonction qui supprime une listes à partir d'un "IDlistes" */
function deleteTache(IDtaches, callback) {
  const query = "DELETE FROM taches WHERE IDtaches=$1";
  utils.executeQuery(query, [IDtaches], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined);
    }
  });
}