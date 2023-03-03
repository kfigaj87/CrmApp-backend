const express = require("express");
const router = express.Router();
const CustomersController = require("../controllers/CustomerController");

module.exports = () => {
  router.get("/", CustomersController.index);

  router.post("/add", CustomersController.create);

  router.delete("/delete/:id", CustomersController.delete);

  return router;
};
