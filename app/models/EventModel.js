const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  description: {
    type: String,
    require: true,
  },

  actionType: {
    type: String,
    required: true,
    enum: ["Telefon", "Spotkanie", "Mail"],
  },
  date: { type: Date, required: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
});

module.exports = mongoose.model("EventModel", EventSchema);
