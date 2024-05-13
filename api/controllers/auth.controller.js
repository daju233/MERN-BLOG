import User from "../../models/user-model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import { response } from "express";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "Allfields are required"));
  }

  const hashedpassword = bcryptjs.hashSync(password, 10); //哈希密码

  const newUser = new User({
    username,
    email,
    password: hashedpassword,
  });

  try {
    await newUser.save();
    res.json("signup suceessful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // console.log(password);
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "Allfields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    // await console.log(validUser);
    if (!validUser) {
      return next(errorHandler(404, "未找到用户"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "密码错误"));
    }
    const token = jwt.sign({ userid: validUser._id }, process.env.JWT_SECRET);

    const { password: _pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httponly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  // const lowerName = name.toLowerCase().spilt(" ").join("");
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httponly: true,
        })
        .json(rest);
    } else {
      const generatedPassword = "1234567890";
      const hashedpassword = bcryptjs.hashSync(generatedPassword);
      const newUser = new User({
        username: name,
        email: email,
        password: hashedpassword,
        profileImage: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser.doc;
      res
        .status(200)
        .cookie("passed_cookie", token, {
          httpONly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
