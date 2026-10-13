import express from "express";
import dotenv from "dotenv";
import aiRoute from "./src/Routes/ai.routes.js";
import createUser from "./src/Routes/create.routes.js";
import findUser from "./src/Routes/finduser.routes.js";
import getUser from "./src/Routes/getuser.routes.js";
import createProject from "./src/Routes/createproject.routes.js";
import getProjects from "./src/Routes/getprojects.routes.js";
import getPublicProjects from "./src/Routes/getpublicprojects.routes.js";
import getRootFolder from "./src/Routes/rootfolder.routes.js";
import createFileFolder from "./src/Routes/create_file_folder.routes.js";
import getChildren from "./src/Routes/getchildren.routes.js";
import getContent from "./src/Routes/getcontent.routes.js";
import saveFile from "./src/Routes/savefile.routes.js";
import deleteFileFolder from "./src/Routes/delete_file_folder.routes.js";
import updateUser from "./src/Routes/updateuser.routes.js";
// import searchUser from "./src/Routes/search.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/Database/database.js";
import authentication from "./src/Middleware/authenticate.js";
import deleteCookie from "./src/Middleware/deletecookie.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/check", authentication);
app.use("/signout", deleteCookie);

app.use("/ai", aiRoute);
app.use("/api/create", createUser);
app.use("/api/finduser", findUser);
app.use("/api/userdata", getUser);
app.use("/api/create_project", createProject);
app.use("/api/get_projects", getProjects);
app.use("/api/get_public_projects", getPublicProjects);
app.use("/api/get_rootfolder", getRootFolder);
app.use("/api/create_file_folder", createFileFolder);
app.use("/api/get_folder_children", getChildren);
app.use("/api/get_file_content", getContent);
app.use("/api/save_content", saveFile);
app.use("/api/delete_file_folder", deleteFileFolder);
app.use("/api/update_user", updateUser);
// app.use("/api/search", searchUser);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
