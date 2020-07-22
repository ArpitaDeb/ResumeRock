const express = require('express');
const router = express.Router();

module.exports = (db) => {
  /* GET users listing. */
  router.get('/', (req, res) => {

    const query = {
      text: 'SELECT * FROM users;'
    };

    db.query(query)
      .then(result => res.json(result))
      .catch(err => console.log(err));

  });

  // ASYNC AWAIT INSTEAD OF .THEN
  // router.get('/', async (req, res) => {
  //   const query = {
  //     text: 'SELECT * FROM users;'
  //   };

  //   try {
  //     const users = await db.query(query);
  //     res.json(users);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });


  router.post('/', (req, res) => {

    // extract the data from req.body
    const { name, email, password } = req.body;
    console.log("req.body:", req.body);
    
    console.log({ name }, { email }, { password });

    // create an insert query in the db

    const query = {
      text: `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      values: [name, email, password]
    };

    db
      .query(query)
      .then(result => res.json(result[0]))
      .catch(err => console.log(err));

    // return the newly created user back


  });

  return router;
};