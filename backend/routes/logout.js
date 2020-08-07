const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  return router;
};