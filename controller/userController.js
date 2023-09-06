import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import USER from "../model/userModel.js";
import TOKEN from "../model/token.js";

export const userRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    const newUser = new USER(user);
    await newUser.save();
    res.status(200).json({
      success: true,
      msg: "User Registered Successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error in registering the user",
      error,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const user = await USER.findOne({ email: req.body.email });
    if (!user) {
      return (
        res.status(400),
        json({
          success: false,
          msg: "Email does not match",
        })
      );
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: "30m",
        }
      );

      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const token = new TOKEN({ token: refreshToken });
      await token.save();

      return res.status(200).json({
        success: true,
        msg: "Login Successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
        username: user.username,
        userId: user._id,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error while logging the user",
      error,
    });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await USER.find().populate("blogs");
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All Users Data",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error In Get All User.",
      success: false,
      error,
    });
  }
};
