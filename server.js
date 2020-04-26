let express = require('express')
let lowdb = require('lowdb')

let bodyParser = require('body-parser')
let cors = require('cors')
const getSQL = require("./getSQL/SQL"); // pour moi quand je créerai des fonctions -- Jack
let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/listes/:id([0-9]*)', (req, res) => {
  getSQL.getListesFromUtilisateur(req.params.id, (err, result) => {
    
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    else {
      return res.json(result)
    }
  })
  
})
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
