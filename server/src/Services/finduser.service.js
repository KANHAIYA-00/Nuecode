import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function findUser(data, res) {
  const { username, password } = data;
  try {
    let user = await User.findOne({ Username: username }).select("+Password");
    if (!user || !(await bcrypt.compare(password, user.Password))) {
      return { status: 400, Message: "Invalid username or password." };
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.Username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("NeuCode", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3600000,
    });
    return { status: 200, Message: "Signin successful." };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, Message: "Something Went Wrong." };
  }
}

export default findUser;
