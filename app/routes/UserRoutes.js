const express = require("express");
const router = express.Router();

const user = require("../controllers/UserController");

module.exports = () => {
  router.post("/signup", user.login, function (req, res) {
    user.add(req.body, function (err, user) {
      if (err) {
        res.status(404);
        res.json({
          error: "User creation failure",
        });
      } else {
        res.json(user);
      }
    });
  });

  router.post("/login", user.login, function (req, res) {
    user.login(req.body, function (err, token) {
      if (err) {
        res.status(404);
        res.json({
          error: "Unable to log in user",
        });
      } else if (token) {
        res.json({ success: true, jwt: token });
      } else {
        res.json({
          success: false,
          message: "The username/password is incorrect",
        });
      }
    });
  });

  return router;
};
