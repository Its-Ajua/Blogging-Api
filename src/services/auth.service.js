import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/index.js";
import User from "../database/schema/user.schema.js";
import { CustomError } from "../lib/custom-error.js";

export const login = async (data) => {
    const {email, password} = data;
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError("User not found", 404);
    }
    
    if (!bcrypt.compareSync(password, user.password)) {
      throw new CustomError("Username or Password is incorrect", 401);
    }

    const token = Jwt.sign(
      {
        _id: user._id,
        sub: user._id,
      },
      JWT_SECRET,
      { expiresIn: "1hr" }
    );
  
    return token;
  };
  
  export const register = async (data) => {
    const {first_name, last_name, email, password} = data;

    const user = await User.findOne({ email });
    if (user) {
      throw new CustomError("User already exists", 400);
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword
    });
    
    await newUser.save();

    return {first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email};
  };