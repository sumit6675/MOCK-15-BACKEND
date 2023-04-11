require("dotenv").config();
const express = require("express");
const { UserModel } = require("../Models/user.model");
userRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoutes.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const duplicateUser = await UserModel.find({ email });
    if (duplicateUser.length > 0) {
      res.status(401).json({ msg: "user Already exists please login" });
    } else {
      bcrypt.hash(password, 8, async (err, hash) => {
        if (err) {
          res.status(401).json({ msg: err });
        } else {
          const user = new UserModel({
            email,
            password: hash,
          });
          await user.save();
          res.status(201).json({ msg: `Registered` });
        }
      });
    }
  } catch (err) {
    console.log("err", err);
    res.status(401).json({ msg: err });
  }
});

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          let token = jwt.sign(
            {
              userId: user[0]._id,
            },
            process.env.secret,
            { expiresIn: "1h" }
          );

          res.status(201).json({
            msg: `user login with email ${email}`,
            Token: token,
            email: user[0].email,
            id: user[0]._id,
          });
        } else {
          res.status(401).json({ msg: `please check your password` });
        }
      });
    } else {
      res
        .status(401)
        .json({ msg: `user with ${email} not found please check your email` });
    }
  } catch (err) {
    console.log("err", err);
    res.status(401).json({ msg: err });
  }
});

userRoutes.post("/addTask", async (req, res) => {
  const {Name,tasks,email }=req.body
  try {
    let user = await UserModel.findOne({ email });
    user.Board.push({name:Name,tasks})
    await user.save()
    res.status(201).json({ msg: `Task Added`,tasks:user });
  } catch (err) {
    console.log("err", err);
    res.status(401).json({ msg: err });
  }
});

userRoutes.post("/getData",async(req,res)=>{
  const { email } = req.body;
  try{
    let user = await UserModel.findOne({ email });
    res.status(201).json({ user: user });
  }catch(err){
    console.log("err", err);
    res.status(401).json({ msg: err });
  }
})

module.exports = {
  userRoutes,
};
