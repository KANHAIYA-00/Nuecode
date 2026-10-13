import User from "../Models/user.js";
import jwt from "jsonwebtoken";

async function updateUser(data, token) {
  if (!data || !token) {
    return { status: 400, Message: "Invalid request data." };
  }
  try {
    const { username } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ Username: username });

    if (!user) {
      return { status: 404, Message: "User not found." };
    }
    user.Avatar = data.avatar;
    await user.save();

    return { status: 200, Message: "User updated successfully." };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, Message: "Something went wrong." };
  }
}

export default updateUser;
