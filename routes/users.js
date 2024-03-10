const express = require('express');
const router = express.Router();
const pool = require('../queries.js');
const bodyParser = require('body-parser');

router.get('/', function (req, res) {
  pool.query(`SELECT * FROM users`, function (err, result) {
    if (err) throw err;
    res.json(result.rows);
  });
});

module.exports = router;
