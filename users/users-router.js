const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Your request could not be fulfilled'});
    });
});

module.exports = router;
