const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  maxSeats: {
    type: Number,
    required: true,
  },
  bookedSeats: {
    type: Number,
    default: 0, // Default to 0 if not provided
  },
  availableSeats: {
    type: Number,
    required: true,
    default: function () {
      return this.maxSeats - this.bookedSeats;
    },
  },
});

const Event = mongoose.model("Events", eventSchema);

module.exports = Event;
