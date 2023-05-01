const express = require("express");
const router = express.Router();
const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.get("/", async (req, res) => {
  const user = await UserModel.find();
  res.send(user);
});

router.post("/register", async (req, res) => {
  const { password, email } = req.body;
  let user = await UserModel.findOne({ email });

  if (user) {
    return res.send({ msg: "user is already register with this email" });
  }
  try {
    user = new UserModel(req.body);
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(500).json({ err: err.message });
      } else {
        user.password = hash;
        await user.save();
        res.status(200).json({ msg: "user has been registered" });
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email });

  if (!user) {
    return res.send({ msg: "User is not exist please register first!" });
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send({ msg: "Invalid crendentials" });
    } else {
      const token = jwt.sign({ authorID: user._id }, "neha", {
        expiresIn: "1h",
      });
      res.send({ msg: "User login successfully", token });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = router;
