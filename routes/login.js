const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../queries.js');
const jwt = require(`jsonwebtoken`);

router.post('/', (req, res) => {
  const token = jwt.sign(
    {
      email: req.body.email,
      password: req.body.password,
    },
    'koderahasia',
    { expiresIn: '1h' }
  );
  res.json({
    token: token,
  });
});

module.exports = router;
