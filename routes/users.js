const express = require('express');
const router = express.Router();
const pool = require('../queries.js');

router.get('/', (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 10;

  pool.query(
    `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result.rows);
    }
  );
});

router.get('/', function (req, res) {
  pool.query(
    `
    SELECT * FROM users ${req.query.limit ? 'limit' + req.query.limit : '10'}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result.rows);
    }
  );
});
module.exports = router;
