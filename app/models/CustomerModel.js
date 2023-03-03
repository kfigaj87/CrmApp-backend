const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
  },

  nip: {
    type: Number,
  },

  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventModel",
    },
  ],
});

module.exports = mongoose.model("Customer", CustomerSchema);
