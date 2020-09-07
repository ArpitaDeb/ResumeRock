const express = require('express');
const router = express.Router();

module.exports = db => {

  const getUserByEmail = function (email) {
    const query = {
      text: `SELECT * FROM users WHERE email = $1;`,
      values: [email]
    };
    return db
      .query(query)
      .then(result => {
        return result[0];
      })
  };

  const registerUser = function (user) {
    console.log('user', user.userName);
    const query = {
      text: `INSERT INTO users (userName, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      values: [user.userName, user.email, user.password]
    };
    return db
      .query(query)
      .then(rows => {
        return rows[0];
      })
  };

  const createEmptyResume = function (userID) {
    const query = {
      text: `INSERT INTO resume (user_id) VALUES ($1) RETURNING *;`,
      values: [userID]
    };
    console.log("Query to create empthy resume", query)
    console.log("HERE!!!!!")
    return db
      .query(query)
  };

  router.post('/', (req, res) => {
    // extract the data from req.body
    const { userName, email, password } = req.body;
    console.log("req.body:", req.body);
    console.log({ userName }, { email }, { password });
    // create an insert query in the db
    const query = {
      text: `INSERT INTO users (userName, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      values: [userName, email, password]
    };
    db
      .query(query)
      .then(result => res.json(result[0]))
      .catch(err => console.log(err));
    // return the newly created user back
  });

  // Handling the register form
  router.post('/register', (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      let templateVars = {
        errorMsg: "Please fill in all details to register"
      };
      return res.json(templateVars)
    };
    const values = { userName, email, password };
    registerUser(values)
      .then((newUser) => {
        createEmptyResume(newUser.id)
        console.log("CREATE EMPTY RESUME")
        return newUser
      })
      .then((newUser) => {
        console.log('User Info: ', newUser);
        req.session['user_id'] = newUser.id;
        req.session.userName = newUser.userName;
        return res.json({});
      })
      .catch((error) => {
        console.log(error);
        return res.status(422).json({ error: error.message });
      });
  });

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      let templateVars = {
        errorMsg: "Please fill in all details to login",
        user: req.session
      };
      return res.status(401).json(templateVars);
    };
    getUserByEmail(email)
      .then(user => {
        if (!user) {
          let templateVars = {
            errorMsg: 'Email is not registered with us',
            user: req.session
          };
          return res.status(401).json(templateVars);
        } else if (user.password !== password) {
          let templateVars = {
            errorMsg: 'Invalid credentials,please try again',
            user: req.session
          };
          return res.status(401).json(templateVars);
        } else {
          req.session['user_id'] = user.id;
          req.session.userName = user.userName;
          return res.json({});
        }
      }).catch((error) => {
        console.log(error);
        res.status(500).end();
      });
  });


  router.get('/', (req, res) => {
    const user_id = req.session['user_id'];
    const query = {
      text: 'SELECT * FROM users WHERE id = $1;',
      values: [userID]
    };
    db.query(query)
      .then(result => res.json(result))
      .catch(err => console.log(err));

  });
  router.get('/logout', (req,res)=>{
    req.session['user_id'] = null;
    req.session.userName = null;
    res.status(200).end();

  })

  return router;
};