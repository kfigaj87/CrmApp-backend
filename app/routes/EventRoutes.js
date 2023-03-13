const express = require("express");
const router = express.Router();

const customerEvent = require("../controllers/EventController");

module.exports = () => {
  router.post("/add/:customerId", customerEvent.add, function (req, res) {
    customerEvent.add(
      req.params.customerId,
      req.body,
      function (err, customerEvent) {
        if (err) {
          res.json({ error: true });
        } else {
          res.json(customerEvent);
        }
      }
    );
  });

  router.delete(
    "/delete/:customerId",
    customerEvent.delete,
    function (req, res) {
      console.log(req.body.customerEventId);
      console.log(req.params.customerId);
      customerEvent.delete(
        req.params.customerId,
        req.body.customerEventId,
        function (err, log) {
          if (err) {
            res.json({ error: true });
          } else {
            res.json(log);
          }
        }
      );
    }
  );

  return router;
};
