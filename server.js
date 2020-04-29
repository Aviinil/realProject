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
router.get('/email', (req, res) => {
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
  
  getSQL.addTacheToListe(req.body.contenutache, req.body.note, req.body.idliste, req.body.echeance, (err,result) => {
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
      console.log("test1")
      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: result
    })
  })
});

/*
app.post('/posts', (req, res) => {
  console.log(req.body)
  if (!req.body.content || !req.body.author) {
    return res.status(400).json({
      message: 'content and author are required'
    })
  }

  let newPost = {
    id: shortid.generate(),
    content: req.body.content,
    author: req.body.author,
    date: new Date().toISOString(),
    comments: []
  }

  db.get('posts').push(newPost).write()

  return res.status(201).json(newPost)
})

app.get('/posts/:id', (req, res) => {
  let post = db.get('posts').find({ id: req.params.id }).value()

  if (!post) {
    return res.status(404).send()
  }

  return res.json(post)
})

app.delete('/posts/:id', (req, res) => {
  db.get('posts').remove({ id: req.params.id }).write()

  return res.status(204).send()
})

app.get('/posts/:id/comments', (req, res) => {
  let post = db.get('posts').find({ id: req.params.id }).value()

  if (!post) {
    return res.status(404).send()
  }

  return res.json(post.comments)
})

app.post('/posts/:id/comments', (req, res) => {
  if (!req.body.author || ! req.body.content) {
    return res.status(400).json({
      message: 'author and content are required'
    })
  }

  let post = db.get('posts').find({ id: req.params.id }).value()

  if (!post) {
    return res.status(404).send()
  }

  let newComment = {
    id: shortid.generate(),
    author: req.body.author,
    content: req.body.content
  }

  let comments = [...post.comments, newComment]

  db.get('posts').find({ id: req.params.id }).assign({ comments }).write()

  return res.json(newComment)
})

app.delete('/posts/:idPost/comments/:idComment', (req, res) => {
  let post = db.get('posts').find({ id: req.params.idPost }).value()

  if (!post) {
    return res.status(404).send()
  }

  let comments = post.comments.filter(
    comment => comment.id !== req.params.idComment
  )

  db.get('posts')
    .find({ id: req.params.idPost })
    .assign({ comments })
    .write()

  return res.status(204).send()
})
*/
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
