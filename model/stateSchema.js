const mongoose = require("mongoose");
const stateSchema = new mongoose.Schema({
  state: { type: String, unique: true, required: true },
  districts: { type: Array, required: true },
});
module.exports = mongoose.model("state", stateSchema);
