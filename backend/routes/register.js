const express = require('express');
const router = express.Router();

module.exports = ({ registerUser, getUserByEmail }) => {
  //display the register form
  router.get("/", (req, res) => {
    let templateVars = {
      errorMsg: null,
      user: req.session
    };
    res.render("register", templateVars);
  });

  // Handling the register form
  router.post('/', (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      let templateVars = {
        errorMsg: "Please fill in all details to register",
        user: req.session
      };
      res.render("register", templateVars)
    };
    //res.cookie('user_id', 'anything');
    //res.json('reg successful');
    getUserByEmail(email)
    .then(user => {
      if (user.email === email) {
        let templateVars = {
          errorMsg: 'Email is already taken',
          user: req.session
        };
        res.render("register", templateVars)
      }
    })
    const values = [userName, email, password];
    registerUser(values)
    .then((newUser) => {
      req.session['user_id'] = newUser.id;
      req.session.userName = newUser.userName;
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
  });
  return router;
};
