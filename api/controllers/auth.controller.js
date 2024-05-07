import User from "../../models/user-model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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

export default signup;
