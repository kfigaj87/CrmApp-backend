const express = require("express");
const router = express.Router();
const customer = require("../controllers/CustomerController");

module.exports = () => {
  router.get("/all", customer.index);
  router.get("/:id", customer.get);
  router.post("/add", customer.create);
  router.delete("/delete/:id", customer.delete);

  return router;
};
