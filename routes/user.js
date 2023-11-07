import express from "express";
import {
  generateToken,
  getUserByEmail,
  updatePassword,
} from "../controllers/user.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

const router = express.Router();

//Log in Router
router.post("/login", async (req, res) => {
  try {
    // check the whether this user is existed or not
    const user = await getUserByEmail(req);
    //if user not exist
    if (!user) {
      return res.status(400).json({ error: "Invalid Authorization" });
    }
    // valadating password below
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    //generate token if nothing wrong
    const token = generateToken(user._id);
    res.status(200).json({ message: "login done Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Sign up router

router.post("/signup", async (req, res) => {
  try {
    // check the user already exist or not
    let user = await getUserByEmail(req);
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email, Already Exist!!" });
    }

    //generate the hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();
    //generate token and give response
    const token = generateToken(user._id);
    res.status(201).json({
      message: "User Registered Successfully",
      token: token,
    });
  } catch (error) {
    alert("Error Occured while doing Signup/ registration");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//password reset
router.put("/reset/password", async (req, res) => {
  try {
    // check the user already exist or not
    let user = await getUserByEmail(req);
    if (!user) {
      return res
        .status(400)
        .json({
          error:
            "user not registered yet. you have to do sign up for the registration!!",
        });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newdata = await updatePassword(req.body.email, hashedPassword);
      if (!updatePassword) {
        return res.status(400).json({
          error: "Error Occured While Updating Password",
        });
      } else {
        res.status(200).json({
          message: "Password Successfully Updated!!! Now You can go to login Page",
          data: newdata,
        });
      }
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const userRouter = router;
