//Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json());

const comments = require('./data/comments');
const products = require('./data/products');

app.use(express.static('public'));

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    body: req.body.body,
    productId: req.body.productId
  };
  if (newComment.body && newComment.productId) {
    comments.push(newComment);
    res.status(201).send(newComment);
  } else {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});