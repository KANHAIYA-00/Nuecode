import mongoose from "mongoose";
const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: false,
      maxlength: 500,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    Email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    Password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    Avatar: {
      type: String,
      required: false,
    },
    Projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
// const user = await User.findOne({ Email: userEmail }).select("+Password");
