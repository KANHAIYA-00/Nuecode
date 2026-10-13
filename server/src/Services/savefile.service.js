import User from "../Models/user.js";
import File from "../Models/file.js";
import jwt from "jsonwebtoken";

async function saveFile(data, token) {
  if (data) {
    try {
      const { username } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ Username: username });
      if (!user) return { status: 404, Message: "User not found" };

      const file = await File.findById(data.id);
      if (!file) return { status: 404, Message: "File not found" };

      file.content = data.content;
      await file.save();

      return { status: 200, Message: "File saved." };
    } catch (error) {
      console.error("Error:", error);
      return { status: 500, Message: "Something Went Wrong." };
    }
  } else {
    return { status: 500, Message: "Something Went Wrong." };
  }
}
export default saveFile;
