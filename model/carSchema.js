const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  details: { type: String, required: true },
  price: {
    type: Number,
  },
});
module.exports = mongoose.model("car", carSchema);
