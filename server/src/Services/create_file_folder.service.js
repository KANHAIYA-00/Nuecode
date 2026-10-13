import User from "../Models/user.js";
import Folder from "../Models/folder.js";
import File from "../Models/file.js";
import jwt from "jsonwebtoken";

async function createFileFolder(data, token) {
  if (data) {
    const { name, parentID, type } = data;
    try {
      const { username } = jwt.verify(token, process.env.SECRET_KEY);

      const user = await User.findOne({ Username: username });

      if (!user) return { status: 404, Message: "User not found" };

      const parentFolder = await Folder.findById(parentID);
      if (!parentFolder) return { status: 404, Message: "Folder not found" };

      if (parentFolder && type === "file") {
        const existingFile = await File.findOne({ name, parentID });
        if (existingFile)
          return {
            status: 400,
            Message: "File with this name already exists.",
          };

        const file = await File.create({
          name: name,
          parentID: parentFolder._id,
          content: "",
        });
        parentFolder.children.files.push(file._id);
        await parentFolder.save();

        return { status: 200, Message: "File Added Successfully." };
      }
      if (parentFolder && type === "folder") {
        const existingFolder = await Folder.findOne({ name, parentID });
        if (existingFolder)
          return {
            status: 400,
            Message: "Folder with this name already exists.",
          };

        const folder = await Folder.create({
          name: name,
          parentID: parentFolder._id,
          children: { folders: [], files: [] },
        });
        parentFolder.children.folders.push(folder._id);
        await parentFolder.save();

        return { status: 200, Message: "Folder Added Successfully." };
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.code === 11000) {
        return {
          status: 400,
          Message: "This project exists for this user.",
        };
      }
      return { status: 500, Message: "Something Went Wrong." };
    }
  } else {
    return { status: 500, Message: "Something Went Wrong." };
  }
}
export default createFileFolder;
