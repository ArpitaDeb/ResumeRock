const express = require('express');
const router = express.Router();

module.exports = db => {
  const getUserByEmail = function (email) {
    return db.query(`
    SELECT * FROM users WHERE email = $2;
    `, [email])
      .then(res => {
        console.log(res);
        return res.rowCount > 0 ? res.rows[0] : null
      });
  };
  const registerUser = function (user) {
    return db.query(`
    INSERT INTO users(userName, password, email)
    VALUES($1, $2, $3)
    RETURNING *;`, [user.userName, user.password, user.email])
      .then(res => res.rows);
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
    console.log('gettingpost', req.body);
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      let templateVars = {
        errorMsg: "Please fill in all details to register"
      };

      return res.json(templateVars)
    };
    //res.cookie('user_id', 'anything');
    //res.json('reg successful');
    console.log("getemail", email);
    db.query(`
    SELECT * FROM users WHERE email = $1;`, [email])
      .then(res => {
        console.log("res", res);
        return res.rowCount > 0 ? res.rows[0] : null
      });
    /*
    //getUserByEmail(email)
      .then(user => {
        console.log('post', user);
        if (user.length > 0 && user[0].email === email) {
          let templateVars = {
            errorMsg: 'Email is already taken',
          };
          return res.json(templateVars)
        }
      })
      .catch(console.log);
      */

    const values = [userName, email, password];
    registerUser(values)
      .then((newUser) => {
        console.log(newUser);
        req.session['user_id'] = newUser.id;
        req.session.userName = newUser.userName;
        return res.send({});
      })
      .catch((error) => {
        return res.status(422).json({ error: error.message });
      });
  });
  router.get('/login', (req, res) => {
    let templateVars = {
      errorMsg: null,
      user: req.session
    };
    res.status("login").json(templateVars);
  });
  router.post('/login', (req, res) => {
    console.log(req.body);
    res.json({ key: 'hi' });
    const { email, password } = req.body;
    if (!email || !password) {
      let templateVars = {
        errorMsg: "Please fill in all details to login",
        user: req.session
      };
      res.status("login").json(templateVars);
    };
    getUserByEmail(email)
      .then(user => {
        if (!user) {
          let templateVars = {
            errorMsg: 'Email is not registered with us',
            user: req.session
          };
          res.status("login").json(templateVars);
        } else if (user.password !== password) {
          let templateVars = {
            errorMsg: 'Invalid credentials,please try again',
            user: req.session
          };
          res.status("login").json(templateVars);
        } else {
          req.session['user_id'] = user.id;
          req.session.userName = user.userName;
        }
      }).catch(console.log);
  });
  return router;
};