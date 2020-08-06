const express = require("express");
const router = express.Router();

module.exports = ({ getUserByEmail }) => {

  router.get("/", (req, res) => {
    let templateVars = {
      errorMsg: null,
      user: req.session
    };
    res.render("login", templateVars);
  });
  
}