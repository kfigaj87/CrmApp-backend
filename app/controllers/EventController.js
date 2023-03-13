const EventModel = require("../models/EventModel");
const CustomerModel = require("../models/CustomerModel");

function addEventModel(customerModelId, data, cb) {
  let newEventModel = new EventModel({
    ...data,
    customerModel: customerModelId,
  });
  newEventModel.save(function (err, eventModel) {
    if (err) {
      cb(err);
    } else {
      CustomerModel.findById(customerModelId, function (err, customerModel) {
        if (err) return;

        customerModel.events.push(eventModel._id);
        customerModel.save();
      });
      cb(null, eventModel);
    }
  });
}

function deleteEventModel(customerModelId, eventModelId, cb) {
  CustomerModel.findById(customerModelId, function (err, customerModel) {
    if (err) return;

    customerModel.events.pull(eventModelId);
    customerModel.save();
  });

  EventModel.deleteOne({ _id: eventModelId }, function (err, log) {
    if (err) {
      cb(err);
    } else {
      cb(null, log);
    }
  });
}

module.exports = {
  add: addEventModel,
  delete: deleteEventModel,
};
