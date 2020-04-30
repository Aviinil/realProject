const users = require('./users')
let express = require('express')
const jwt = require('jsonwebtoken');
const config = require("./config.js");
let bodyParser = require('body-parser')
let cors = require('cors')
const envoiMail = require("./mailer/mailer"); // Pour le mailer de Saïd -- Jack
const getSQL = require("./getSQL/SQL"); // pour moi quand je créerai des fonctions -- Jack
let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Pour le mailer, a modifier 
/* destinataire = une fonction pour mettre l'adresse email de l'utilisateur ici */
/*
app.get('/email', (req, res) => {
  envoiMail.sendEmail(destinataire, (err, result) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.json({ message: 'Message sent: ' + result.response });

  });
});
*/
app.get('/listes/:id([0-9]*)', (req, res) => {
  getSQL.getListeFromUtilisateur(req.params.id, (err, result) => {
    
    if (err) {
      res.status(500).json(result);
      return;
    }
    else {
      return res.json(result)
    }
  })
  
})

app.get('/taches/:id([0-9]*)', (req, res) => {
  getSQL.getTacheFromListe(req.params.id, (err, result) => {
    
    if (err) {
      res.status(500).json(result);
      return;
    }
    else {
      return res.json(result)
    }
  })
  
})
app.get('/etapes/:id([0-9]*)', (req, res) => {
  getSQL.getEtapeFromTache(req.params.id, (err, result) => {
    
    if (err) {
      res.status(500).json(result);
      return;
    }
    else {
      return res.json(result)
    }
  })
  
})

app.get('/utilisateurs/login/:email/:password', (req, res) => {
  let mail = req.params.email;
  let mdp = req.params.password
  users.authenticate(mail, mdp , (err, result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }
    const userFound = result;
    if (userFound) {
      const token = jwt.sign(
        { username: userFound.email }, 
        config.secret, 
        { expiresIn: '12h' }
      );
      res.json({
        Util: userFound,
        message: 'Authentication successful!',
        token: token
        
        
      });
    } else {
      res.status(403).json({
        message: 'Incorrect username or password',
        token: null
      });
    }
  });
  
})

app.post('/utilisateurs/signin', (req, res) => {

  users.create(req.body.email, req.body.password, (err, result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: `Utilisateur ${result.email} / ${result.email} sauvegardé avec succès.`,
      id: result.IDutilisateur,
      email: result.email
    });
  });
});

app.post('/listes/ajout', (req, res) => {
  
  getSQL.addListeToUtilisateur(req.body.titre, req.body.idutil, (err,result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }
    res.json({
      idutil: result.idutilisateur,
      titre: result.titre,
      idliste: result.idliste
    })
  })
});

app.post('/taches/ajout', (req, res) => {
  
  getSQL.addTacheToListe(req.body.contenutache, req.body.idliste, req.body.echeance, (err,result) => {
    if (err) {
      res.status(500).json([{ message: result }]);
      return;
    }

    res.json({
      idtache: result.idtache,
      contenutache: result.contenutache,
      note: result.note,
      idliste: result.idliste,
      checked: result.checked,
      echeance: result.echeance
    })
  })
});

app.post('/etapes/ajout', (req, res) => {
  
  getSQL.addEtapeToTache(req.body.contenuetape, req.body.idtache, (err,result) => {
    if (err) {
      res.status(500).json([{ message: result }]);
      return;
    }

    res.json({
      idtache: result.idtache,
      contenuetape: result.contenuetape,
      idetape: result.idetape,
      checked: result.checked
    })
  })
});
app.delete('/listes', (req, res) => {
  
  
  getSQL.deleteListe(req.body.idliste, (err, result) => {
    if (err) {
     
      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: result
    })
  })
});

app.delete('/taches', (req, res) => {
  
  getSQL.deleteTache(req.body.idtache, (err, result) => {
    if (err) {

      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: result
    })
  })
});

app.delete('/etapes', (req, res) => {
  
  getSQL.deleteEtape(req.body.idetape, (err, result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: result
    })
  })
});
app.patch('/etapes', (req, res) => {
  
  getSQL.checkEtape(req.body.idetape, req.body.checked, (err, result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: result
    })
  })
});

app.patch('/taches', (req, res) => {
  
  getSQL.checkTache(req.body.idtache, req.body.checked, (err, result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: result
    })
  })
});

app.patch('/taches/modif', (req, res) => {
  // prendre toutes les valeurs de la sidebar
  getSQL.modifTache(req.body.idtache,req.body.contenutache, req.body.echeance, req.body.note, (err, result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: result
    })
  })
});

app.patch('/email/modif', (req, res) => {
  
  getSQL.modifMail(req.body.idutil,req.body.mail, (err, result) => {
    if (err) {
      res.status(500).json({ message: false });
      return;
    }

    res.json({
      message: true
    })
  })
});

app.get('/parametres/verif/:email/:mdp', (req, res) => {
  let mail = req.params.email;
  let mdp = req.params.mdp;
  users.authenticate(mail, mdp , (err, result) => {
    if (err) {
      console.log("erreur")
      res.status(500).json({ message: result });
      return;
    }
    const userFound = result;
    if (userFound) {
      
      res.json({
        Util: userFound,
        message: 'Authentication successful!',
        mdp : true
        
      });
    } else {
      res.status(403).json({
        message: 'Incorrect username or password'
        
      });
    }
  });
  
})


app.patch('/mdp/modif', (req, res) => {
  
  getSQL.modifMdp(req.body.idutil,req.body.mdp, (err, result) => {
    if (err) {
      res.status(500).json({ message: false });
      return;
    }

    res.json({
      message: true
    })
  })
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
