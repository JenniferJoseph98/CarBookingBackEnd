const { hashGenerate, hashValidator } = require("../bcrypt/hashing");
const { tokenGenerator } = require("../bcrypt/token");
const User = require("../model/userSchema");
const authRoutes = require("express").Router();
const { emailSender } = require("../bcrypt/Mail");

authRoutes.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser != null || !existingUser) {
      const hashPass = await hashGenerate(req.body.password);
      const user = await User.create({
        email: req.body.email,
        password: hashPass,
      });
      let mailContent = `
Hi ${req.body.email.split("@")[0]},

Thank you for choosing our booking application. We appreciate your trust in our services.
We are grateful for your support and trust in our booking application. We look forward to providing you with a seamless and satisfying experience.

Thanks and regards,
Jennifer Joseph
      `;
      let emailSend = emailSender(
        mailContent,
        "Successfully Register",
        req.body.email
      );
      console.log(emailSend);

      res.json({
        status: "success",
        message: "Registration succesful",
        user,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Email already Exist",
      });
    }
  } catch (error) {
    res.send("Unable to signup");
  }
});
authRoutes.post("/login", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser === null || !existingUser) {
      res.status(400).json({
        status: "Failed",
        message: "User Not Found, Kindly signup ",
      });
    } else {
      let passCheck = await hashValidator(
        req.body.password,
        existingUser.password
      );
      if (passCheck) {
        let token = tokenGenerator(req.body.email, process.env.JWT_KEY);
        res.status(200).json({
          status: "Success",
          token: token,

          email: existingUser.email,
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Check your credentials",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Check your credentials",
    });
  }
});
module.exports = authRoutes;
