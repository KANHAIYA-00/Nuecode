import User from "../Models/user.js";
import Folder from "../Models/folder.js";
import Project from "../Models/project.js";
import jwt from "jsonwebtoken";

async function createProject(data, token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { username } = decoded;

    const user = await User.findOne({ Username: username });

    if (!user) return { status: 404, Message: "User not found" };

    const formatedName = data.name.replace(/\s+/g, "-");

    if (formatedName) {
      const existingProject = await Project.findOne({
        name: formatedName,
        owner: username,
      });

      if (existingProject) {
        return {
          status: 400,
          Message: "This project already exists for this user.",
        };
      }

      const rootFolder = await Folder.create({
        name: `${formatedName}`,
        children: { folders: [], files: [] },
      });

      const project = await Project.create({
        name: formatedName,
        description: data.description || "",
        status: data.status || "Private",
        rootFolder: rootFolder._id,
        owner: username,
      });

      user.Projects.push(project._id);
      await user.save();
      return { status: 200, Message: "Project Created Successfully." };
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
}
export default createProject;
