const carRoutes = require("express").Router();
const Car = require("../model/carSchema");
const Booking = require("../model/BookingSchema");
carRoutes.get("/", async (req, res) => {
  try {
    let fullData = await Car.aggregate([{ $sample: { size: 10 } }]);
    res.send(fullData);
  } catch (error) {
    res.send(error.message);
  }
});

carRoutes.get("/:id", async (req, res) => {
  try {
    const getById = await Car.findById({ _id: req.params.id });
    res.send(getById);
  } catch (error) {
    res.send(error);
  }
});

carRoutes.post("/allcars", async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.send(newCar);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = carRoutes;
