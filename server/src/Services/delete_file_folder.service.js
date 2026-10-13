import User from "../Models/user.js";
import Folder from "../Models/folder.js";
import File from "../Models/file.js";
import jwt from "jsonwebtoken";

async function deleteFileFolder(data, token) {
  if (data) {
    try {
      const { username } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ Username: username });
      if (!user) return { status: 404, Message: "User not found" };

      let itemToDelete;
      if (data.type === "file") {
        itemToDelete = await File.findById(data.ID);
      } else if (data.type === "folder") {
        itemToDelete = await Folder.findById(data.ID);
      }
      if (!itemToDelete) return { status: 404, Message: `${type} not found.` };

      if (itemToDelete.parentID) {
        const parentFolder = await Folder.findById(itemToDelete.parentID);
        if (parentFolder) {
          if (data.type === "file") {
            parentFolder.children.files = parentFolder.children.files.filter(
              (fileId) => fileId.toString() !== data.ID
            );
          } else if (data.type === "folder") {
            async function deleteFolderRecursively(folderId) {
              const folder = await Folder.findById(folderId);
              if (!folder) return;
              // Delete files within the folder
              await File.deleteMany({ _id: { $in: folder.children.files } });
              // Recursively delete subfolders
              for (const subFolderId of folder.children.folders) {
                await deleteFolderRecursively(subFolderId);
              }
              // Delete the folder itself
              await folder.deleteOne();
            }
            await deleteFolderRecursively(data.ID);
            // Remove reference from parent folder
            parentFolder.children.folders =
              parentFolder.children.folders.filter(
                (folderId) => folderId.toString() !== data.ID
              );
          }
          await parentFolder.save();
        }
      }

      await itemToDelete.deleteOne();
      return {
        status: 200,
        Message: `${data.type} deleted successfully.`,
      };
    } catch (error) {
      console.error("Error:", error);
      return { status: 500, Message: "Something Went Wrong." };
    }
  } else {
    return { status: 500, Message: "Something Went Wrong." };
  }
}
export default deleteFileFolder;
