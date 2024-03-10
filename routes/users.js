const express = require('express');
const router = express.Router();
const pool = require('../queries.js');

router.get('/', function (req, res) {
  pool.query(
    `SELECT * FROM users${req.query.limit ? 'LIMIT ' + req.query.limit : ''} `,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});
module.exports = router;
