import mongoose from "mongoose";
const fileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    parentID: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
fileSchema.index({ name: 1, parentID: 1 }, { unique: true });
const File = mongoose.model("File", fileSchema);
export default File;
