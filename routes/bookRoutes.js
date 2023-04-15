const bookRoutes = require("express").Router();
const nodemailer = require("nodemailer");
const { emailSender } = require("../bcrypt/Mail");

const Booking = require("../model/BookingSchema");
bookRoutes.post("/", async (req, res) => {
  try {
    const newBook = await Booking.create(req.body);
    emailSender(req.body.details, "Successfully Booked", req.body.userEmail);
    res.send(newBook);
  } catch (error) {
    res.send(error.message);
  }
});
bookRoutes.get("/", async (req, res) => {
  try {
    let findOrders = await Booking.find({ userEmail: req.headers.email });
    res.send(findOrders);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = bookRoutes;
