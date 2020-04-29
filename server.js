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
app.get('/email', (req, res) => {
  envoiMail.sendEmail(destinataire/* destinataire = une fonction pour mettre l'adresse email de l'utilisateur ici */, (err, result) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.json({ message: 'Message sent: ' + result.response });

  });
});

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

app.post('/utilisateurs/signin/:email/:password', (req, res) => {
  let mail = req.params.email;
  let mdp = req.params.password

  users.create(mail, mdp, (err, result) => {
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

app.patch('/taches/date', (req, res) => {
  
  getSQL.dateTache(req.body.idtache, req.body.echeance, (err, result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: result
    })
  })
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
