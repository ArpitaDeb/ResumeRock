const express = require('express');
const router = express.Router();

module.exports = db => {

  router.get('/', (req, res) => {
    const userID = req.session.user_id;
    const query = {
      text: `SELECT * FROM resume WHERE user_id= ${userID};`
    };
    db.query(query)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  });

  router.post('/', (req, res) => {
    console.log("post to resume: req.body", req.body)
    const { resumeData } = req.body;
    const user = req.session.user_id
    const format = require('pg-format');
    const sql = format('UPDATE resume SET resumedata = %L WHERE user_id = %s', resumeData, user);
    const query = {
      text: sql
    };
    db.query(query);
    res.status(200).send('All good!')
  });

  return router;
};