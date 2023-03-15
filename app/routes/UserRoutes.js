const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", (req, res) => {
  userController.addUser(req.body, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(user);
    }
  });
});

router.post("/login", (req, res) => {
  userController.loginUser(req.body, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(401).send("Incorrect username or password");
    }
  });
});

module.exports = router;
