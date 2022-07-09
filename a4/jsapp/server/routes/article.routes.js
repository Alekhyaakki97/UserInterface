const router = require('express').Router();
const Article = require('../models/article.model');

router.route('/:id').get((req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        res.json(article);
      } else {
        res.status(404).json('Article not found');
      }
    })
    .catch((error) => res.status(500).json('errormsg: ' + error));
});

router.route('/').get((req, res) => {
  Article.find()
    .then((allArticles) => res.json(allArticles))
    .catch((error) => res.status(500).json('errormsg:' + error));
});

router.route('/').post((req, res) => {
  const heading = req.body.heading;
  const content = req.body.content;
  const author = req.body.author;

  const newArticle = new Article({
    heading: heading,
    content: content,
    author: author,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  newArticle
    .save(newArticle)
    .then(() => res.json(newArticle))
    .catch((error) => res.status(500).json('errormsg: ' + error));
});

router.route('/:id').put((req, res) => {
  const heading = req.body.heading;
  const content = req.body.content;
  Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        heading && (article.heading = heading);
        content && (article.content = content);
        article.updatedAt = new Date();
        article
          .save()
          .then(() => res.json('Successfully updated article details'))
          .catch((error) => res.status(500).json('errormsg: ' + error));
      } else {
        res.status(404).json('Article not found');
      }
    })
    .catch((error) => res.status(500).json('errormsg: ' + error));
});

router.route('/:id').delete((req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.json('Successfully deleted article'))
    .catch((error) => res.status(500).json('errormsg: ' + error));
});

module.exports = router;
