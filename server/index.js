const express = require('express');
const bodyParser = require('body-parser');
const githubHelper = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // res.status(201).send(req.query);
  githubHelper.getReposByUsername(req.body.term)
    .then((repos) => {
      db.save(repos);
    })
    .then((results) => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.get('/repos', function (req, res) {
  db.getTop25()
    .then((repos) => {
      res.status(200).send(repos);
    })
    .catch(() => {
      res.sendStatus(400);
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
