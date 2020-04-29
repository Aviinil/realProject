const utils = require("../bdd/utils");

// Fonction utilisable par l'exterieur
// <!>Je vais tout mettre au singulier parce que je m'emmele les pinceaux<!>
module.exports = {
    addListeToUtilisateur,
    getListeFromUtilisateur,
    deleteListe,
    addTacheToListe,
    getTacheFromListe,
    deleteTache,
    addEtapeToTache,
    getEtapeFromTache,
    deleteEtape
  };


/* Fonction qui créer une liste pour un utilisateur precis à partir d'un "IDutilisateur" */
function addListeToUtilisateur( titre, IDutilisateur, callback) {
  const query = "INSERT INTO liste(IDliste, titre, IDutilisateur) VALUES (nextval('SeqIDliste'), $1, $2) RETURNING *";
  utils.executeQuery(query, [titre, IDutilisateur], (err, result) => {
    if (err) {
      callback(true, err);
    } else if (result.rows.length === 0) {
      callback(true, `Impossible de retrouver l'utilisateur ${IDutilisateur}`);
    } else {
      callback(undefined, result.rows[0]);
    }
  });
}
/* Fonction qui recupere les liste d'un utilsateur precis à partir d'un "IDutilisateur" */
function getListeFromUtilisateur(IDutilisateur, callback) {
  const query = "SELECT * FROM liste WHERE IDutilisateur=$1";
  utils.executeQuery(query, [IDutilisateur], (err, result) => {
    if (err) {
      callback(true, err);
    } else if (result.rows.length === 0) {
      callback(true, []);
    } else {
      callback(undefined, result.rows);
     
    }
  });
}
/* Fonction qui supprime une liste à partir d'un "IDliste" */
function deleteListe(IDliste, callback) {
  console.log("mega test")
  console.log(IDliste)
  const query = "DELETE FROM liste WHERE IDliste=$1";
  utils.executeQuery(query, [IDliste], (err, result) => {
    if (err) {
      console.log(err)
      console.log(result)
      callback(true, err);
    } else {
      callback(undefined, "Suppression de liste réussie");
    }
  });
}

/* Fonction qui ajoute une tache dans une liste precise à partir d'une "IDliste" */
function addTacheToListe( contenuTache, IDliste, echeance , callback) {
  const query = "INSERT INTO tache (IDtache, contenuTache, IDliste, echeance) VALUES (nextval('SeqIDtache'), $1, $2, $3) RETURNING *";
  utils.executeQuery(query, [contenuTache, IDliste, echeance], (err, result) => {
    if (err) {
      callback(true, result);
    } else {
      callback(undefined, result.rows[0]);
    }
  });
}
/* Fonction qui recupere les taches d'une liste precise à partir d'une "IDliste" */
function getTacheFromListe(IDliste, callback) {
    const query = "SELECT * FROM tache WHERE IDliste=$1";
    utils.executeQuery(query, [IDliste], (err, result) => {
      if (err) {
        callback(true, err);
      } else if (result.rows.length === 0) {
        callback(true, []);
      } else {
        callback(undefined, result.rows);
      }
    });
}
/* Fonction qui supprime une liste à partir d'un "IDliste" */
function deleteTache(IDtache, callback) {
  const query = "DELETE FROM tache WHERE IDtache=$1";
  utils.executeQuery(query, [IDtache], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined);
    }
  });
}
/* Fonction qui ajoute une etape dans une tache precise à partir d'une "IDtache" */
function addEtapeToTache(contenuEtape, IDtache , callback) {
  const query = "INSERT INTO etape (IDetape, contenuEtape, IDtache) VALUES (nextval('SeqIDetape'), $1, $2) RETURNING *";
  utils.executeQuery(query, [contenuEtape, IDtache], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows[0]);
    }
  });
}
/* Fonction qui recupere les etapes d'une tache precise à partir d'une "IDtache" */
function getEtapeFromTache(IDtache, callback) {
  const query = "SELECT * FROM etape WHERE IDtache=$1";
  utils.executeQuery(query, [IDtache], (err, result) => {
    if (err) {
      callback(true, err);
    } else if (result.rows.length === 0) {
      callback(undefined, []);
    } else {
      callback(undefined, result.rows);
    }
  });
}
/* Fonction qui supprime une etape à partir d'un "IDetape" */
function deleteEtape(IDtache, callback) {
const query = "DELETE FROM etape WHERE IDetape=$1";
utils.executeQuery(query, [IDtache], (err, result) => {
  if (err) {
    callback(true, err);
  } else {
    callback(undefined);
  }
});
}