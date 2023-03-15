const EventModel = require("../models/EventModel");
const CustomerModel = require("../models/CustomerModel");

function addEvent(req, res) {
  const customerId = req.params.customerId;
  const eventData = req.body;

  if (!customerId) {
    return res.status(400).json({ error: "Customer ID is missing" });
  }

  EventModel.create(eventData, (err, event) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not create event" });
    } else {
      CustomerModel.findById(customerId, (err, customer) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Could not find customer" });
        } else {
          customer.events.push(event._id);
          customer.save((err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Could not save customer" });
            } else {
              res.status(201).json(event);
            }
          });
        }
      });
    }
  });
}

function deleteEvent(req, res) {
  const customerId = req.params.customerId;
  const eventId = req.params.eventId;

  CustomerModel.findById(customerId, (err, customer) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      customer.events.pull(eventId);
      customer.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          EventModel.findByIdAndDelete(eventId, (err, event) => {
            if (err) {
              console.error(err);
              res.status(500).send(err);
            } else {
              if (event) {
                res.status(200).json({ success: true });
              } else {
                res.status(404).json({ success: false });
              }
            }
          });
        }
      });
    }
  });
}

module.exports = {
  addEvent,
  deleteEvent,
};
