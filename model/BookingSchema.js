const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  details: { type: String, required: true },
  price: { type: Number, required: true },
  carID: { type: mongoose.Types.ObjectId, ref: "cars" },
  slotTiming: { type: String },
  carType: { type: String, default: "rental" },
  Shift: { type: String, default: "Yes" },
  userEmail: { type: String },
  paymentType: { type: String, required: true },
});
module.exports = mongoose.model("booking", bookingSchema);
