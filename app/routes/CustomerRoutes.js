const express = require("express");
const router = express.Router();
const customer = require("../controllers/CustomerController");

module.exports = () => {
  router.get("/all", customer.index, function (_req, res) {
    customer.all(function (err, customers) {
      if (err) {
        res.json({ error: true });
      } else {
        res.json(customers);
      }
    });
  });

  router.get("/:id", customer.index, function (req, res) {
    customer.get(req.params.id, function (err, customer) {
      if (err) {
        res.json({ error: true });
      } else {
        res.json(customer);
      }
    });
  });

  router.post("/add", customer.create, function (req, res) {
    customer.add(req.body, function (err, customer) {
      if (err) {
        res.json({ error: true });
      } else {
        res.json(customer);
      }
    });
  });

  router.delete("/delete/:id", customer.delete, function (req, res) {
    customer.delete(req.params.id, function (err, result) {
      if (err) {
        res.json({ error: true });
      } else {
        res.json(result);
      }
    });
  });

  return router;
};
