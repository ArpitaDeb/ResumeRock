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
  /* GET users listing. */
  router.get('/', (req, res) => {
    const query = {
      text: 'SELECT * FROM users;'
    };
    db.query(query)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  });

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

  //display the register form
  router.get('/register', (req, res) => {
    console.log(req.body);
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
        console.log('line104', newUser);
        req.session['user_id'] = newUser.id;
        req.session.userName = newUser.userName;
        return res.json({});
      })
      .catch((error) => {
        console.log(error);
        return res.status(422).json({ error: error.message });
      });
  });
  router.get('/login', (req, res) => {
    let templateVars = {
      errorMsg: null,
      user: req.session
    };
    return res.json(templateVars);
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
          console.log('113',user.id);
          req.session.userName = user.userName;
          return res.json({});
        }
      }).catch((error) => {
        console.log(error);
        res.status(500).end();
      });
  });
  router.post('/resumes/:id', (req, res) => {
    console.log('line122', req.session.user_id);
    console.log('response from resume route');
    const { data} = req.body;
    const query = {
      text: `INSERT INTO resumes ( user_id, resumedata) VALUES ($1::integer, $2:: jsonb) RETURNING *;`,
      values: [req.session.user_id, data]
    }
    return db
      .query(query)
      .then(result => {
        console.log(result);
        return res.json(result[0]);
      })
  });
  router.get('/resumes/:id', (req, res) => {
    //const { } = req.body;
    const query = {
      text: `SELECT * FROM resumes JOIN users ON users.id = resumes.user_id WHERE user_id = $1::integer LIMIT 1 ORDER BY id DESC;`,
      values: [req.session.user_id]
    };
    return db.query(query)
      .then(result => {
        console.log(result);
        res.json(result)})
      .catch(err => console.log(err));
  });
  return router;
};