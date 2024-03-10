const pool = require('../queries.js');
const jwt = require('jsonwebtoken');
const authentication = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, 'koderahasia');
  console.log(decoded);

  pool.query(
    `SELECT * FROM users WHERE email = '${decoded.email}'`,
    function (err, result) {
      if (err) throw err;
      if (result.rows.length > 0) {
        const user = result.rows[0];
        req.loggedUser = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
        next();
      } else {
        res.status(404).json({ message: 'error not foud' });
      }
    }
  );
};

module.exports = {
  authentication,
};
