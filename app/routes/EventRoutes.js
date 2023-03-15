const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");

router.post("/add/:customerId/events", eventController.addEvent);
router.delete(
  "/delete/:customerId/events/:eventId",
  eventController.deleteEvent
);

module.exports = router;
