import mongoose from "mongoose";
const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
    },
    description: {
      type: String,
      maxlength: 200,
      required: false,
      default: "",
    },
    status: {
      type: String,
      default: "Private",
    },
    rootFolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
projectSchema.index({ name: 1, owner: 1 }, { unique: true });
const Project = mongoose.model("Project", projectSchema);
export default Project;
