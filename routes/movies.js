/**
 * @swagger
 * components:
 *   schemas:
 *     Movies:
 *       type: object
 *       required:
 *         - title
 *         - genres
 *         - year
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of th movies
 *         title:
 *           type: string
 *           description: the title of movies
 *         genres:
 *           type: string
 *           description: The genre of the movies
 *         year:
 *           type: string
 *           description: the year movies was released
 *       example:
 *         id: 1
 *         title: Reckcless
 *         genres: Comedy
 *         year: 2001
 */
// biar
// sama
// seperti
// di
// video
// lms
/**
 * @swagger
 * tags:
 *   name: movies
 *     description: The movies managing API
 * /movies:
 *   post:
 *     summary: Create a new movies
 *     tags: [movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/movies'
 *     responses:
 *       200:
 *         description: The created movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/movies'
 *       500:
 *         description: Some server error
 * /movies/{id}
 *   get :
 *     summary: Get the movies by id
 *     tags: [movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movies id
 *     responses:
 *       200:
 *         description: The movies response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: *#/components/schemas/movies'
 *       404:
 *         description: The movies was not found
 *  put:
 *   summary: Update the movies by the id
 *   tags: [movies]
 *   parameters:
 *     - in : path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The movie id
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/movies'
 *   responses:
 *     200:
 *       description: The movies was updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/movies'
 *     404:
 *       description: The movies was not found
 *     500:
 *       description: Some error happened
 *   delete:
 *     summary: Remove the movies by id
 *     tags: [movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the movies id
 *
 *   responses:
 *     200:
 *       description: the movies was deleted
 *     404:
 *       description: the movies was not found
 *
 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../queries.js');
const { authentication } = require('../middlewares/auth.js');

router.get('/', authentication, function (req, res, next) {
  pool.query(
    `SELECT * FROM movies ${
      req.query.limit ? 'LIMIT ' + req.query.limit : ''
    } `,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

router.get('/:id', function (req, res) {
  pool.query(
    `SELECT * FROM movies WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

router.post('/', function (req, res) {
  pool.query(
    `INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3);`,
    [req.body.title, req.body.genres, req.body.year],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: 'Post Success',
      });
    }
  );
});

router.delete('/:id', function (req, res) {
  pool.query(
    `DELETE FROM movies WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: 'Delete Success',
      });
    }
  );
});

router.put('/:id', function (req, res) {
  pool.query(
    `UPDATE movies SET year = "${req.body.year}" WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: 'success',
      });
    }
  );
});

module.exports = router;
