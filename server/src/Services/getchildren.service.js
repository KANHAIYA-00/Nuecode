import User from "../Models/user.js";
import Folder from "../Models/folder.js";
import jwt from "jsonwebtoken";

async function getChildren(data, token) {
  if (data) {
    try {
      const { username } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ Username: username });
      if (!user) return { status: 404, Message: "User not found" };

      const parentFolder = await Folder.findById(data.id).populate({
        path: "children",
        populate: { path: "folders files", select: "-__v -createdAt -content" },
      });
      if (!parentFolder) return { status: 404, Message: "Folder not found" };

      return { status: 200, Message: parentFolder.children };
    } catch (error) {
      console.error("Error:", error);
      return { status: 500, Message: "Something Went Wrong." };
    }
  } else {
    return { status: 500, Message: "Something Went Wrong." };
  }
}
export default getChildren;
