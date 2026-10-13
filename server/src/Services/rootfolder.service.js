import jwt from "jsonwebtoken";
import Project from "../Models/project.js";
import { populate } from "dotenv";

async function getRootFolder(token, body) {
  try {
    const { username } = jwt.verify(token, process.env.SECRET_KEY);
    const { projectName } = body;

    if (!projectName)
      return { status: 400, Message: "Project name is required." };

    const project = await Project.findOne({
      name: projectName,
      owner: username,
    }).populate({
      path: "rootFolder",
      populate: {
        path: "children",
        populate: { path: "folders files", select: "-__v -createdAt -content" },
      },
      select: "-__v -createdAt -content",
    });

    if (!project) return { status: 404, Message: "Project not found" };
    return { status: 200, Message: project.rootFolder };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, Message: "Something Went Wrong." };
  }
}

export default getRootFolder;
