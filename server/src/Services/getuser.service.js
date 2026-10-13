import User from "../Models/user.js";
import jwt from "jsonwebtoken";

async function getUser(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { username } = decoded;
    const user = await User.findOne({ Username: username }).select(
      "-_id -__v -Projects"
    );
    if (!user) {
      return { status: 404, Message: "User not found" };
    }
    return { status: 200, Message: user };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, Message: "Something Went Wrong." };
  }
}

export default getUser;
