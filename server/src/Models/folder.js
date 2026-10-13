import mongoose from "mongoose";
const folderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    parentID: {
      type: String,
    },
    children: {
      folders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Folder", // Reference to other folders
        },
      ],
      files: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "File", // Reference to files
        },
      ],
    },
  },
  { timestamps: true }
);
folderSchema.index({ name: 1, parentID: 1 }, { unique: true });
const Folder = mongoose.model("Folder", folderSchema);
export default Folder;
