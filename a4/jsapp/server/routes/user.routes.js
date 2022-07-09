const router = require('express').Router();
const User = require('../models/user.model');
const Article = require('../models/article.model');
const bcryptjs = require('bcryptjs');

router.route('/:userid/articles').get((req, res) => {
  Article.find({ author: req.params.userid })
    .then((allArticles) => res.json(allArticles))
    .catch((error) => res.status(500).json('errormsg:' + error));
});
router.route('/login').post((req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        let salt = user.salt;
        let pHash = hash(password, salt);
        if (pHash == user.password) {
          user.password = '';
          user.salt = '';
          return res.json(user);
        } else {
          return res
            .status(401)
            .json({ message: undefined, error: 'Login fail' });
        }
      } else {
        res.status(404).json({ message: undefined, error: ' User Not found' });
      }
    })
    .catch((e) =>
      res
        .status(500)
        .json({ message: undefined, error: 'Internal server error' })
    );
});

router.route('/register').post((req, res) => {
  console.log('register');
  let username = req.body.username;
  let password = req.body.password;
  const salt = genSalt();
  console.log(salt);
  password = hash(password, salt);
  console.log('hashed-password', password);
  const user = new User({
    username,
    password,
    salt,
  });
  user
    .save()
    .then((user) => {
      user.password=""
      user.salt=""
      res.json(user);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      if(err['code'] == 11000){
        return res
        .status(400)
        .json({ message: undefined, error: 'User already exists' });
      }
      res
        .status(500)
        .json({ message: undefined, error: 'Internal server error' });
    });
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .select(['-password', '-salt'])
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json('User not found');
      }
    })
    .catch((error) => res.status(500).json('errormsg: ' + error));
});

router.route('/').get((req, res) => {
  User.find()
    .select(['-password', '-salt'])
    .then((allUsers) => res.json(allUsers))
    .catch((error) => res.status(500).json('errormsg:' + error));
});

router.route('/').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const bio = req.body.bio;
  const salt = genSalt();
  const newUser = new User({
    username,
    email,
    password: hash(password, salt),
    bio,
    salt,
  });
  newUser
    .save()
    .then(() => res.json('Successfully created new user'))
    .catch((error) => res.status(500).json('errormsg: ' + error));
});

router.route('/:id').put((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const bio = req.body.password;
  User.findById(req.params.id)
    .select(['-salt', '-password'])
    .then((user) => {
      if (user) {
        username && (user.username = username);
        email && (user.email = email);
        password && (user.password = password);
        bio && (user.bio = bio);
        user
          .save()
          .then(() => res.json('Successfully updated user details'))
          .catch((error) => res.status(500).json('errormsg: ' + error));
      } else {
        res.status(404).json('User not found');
      }
    })
    .catch((error) => res.status(500).json('errormsg: ' + error));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Successfully deleted user'))
    .catch((error) => res.status(500).json('errormsg: ' + error));
});

function hash(text, salt) {
  return bcryptjs.hashSync(text, salt);
}

function genSalt() {
  return bcryptjs.genSaltSync(5);
}
module.exports = router;
