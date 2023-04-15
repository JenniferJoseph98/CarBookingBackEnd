const stateRoutes = require("express").Router();
const State = require("../model/stateSchema");
stateRoutes.get("/", async (req, res) => {
  try {
    const fullState = await State.find().sort({ state: 1 });
    res.status(200).json({
      status: "Success",
      state: fullState,
    });
  } catch (error) {
    res.send(error);
  }
});
stateRoutes.post("/", async (req, res) => {
  try {
    const addedState = await State.create(req.body);
    res.send(addedState);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = stateRoutes;
