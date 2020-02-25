const bcrypt = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      req.session.loggedIn = true;
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.username = user.username;

        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(({name, message, stack}) => {
      res.status(500).json({name, message, stack});
    });
});

router.get('/logout', (req, res) => {
  if (req.session) {
  req.session.destroy(error => { // deletes the session information from the table
    if (error) {
      res.status(500).json({ error: 'Logout attempt failed.'})
    } else {
      res.status(200).json({ message: 'Log out successful.'})
    }
  }); 
  } else {
    res.status(200).json({ message: 'Bye, Felicia!'});
  }
});

module.exports = router;
