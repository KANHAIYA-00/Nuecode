import User from "../Models/user.js";
import bcrypt from "bcrypt";

async function createUser(data) {
  const { username, email, password } = data;

  try {
    const [existingUsername, existingEmail] = await Promise.all([
      User.findOne({ Username: username }),
      User.findOne({ Email: email }),
    ]);

    if (existingUsername) {
      return { status: 400, Message: "Username already taken." };
    }
    if (existingEmail) {
      return { status: 400, Message: "Email already exists." };
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.create({
      Username: username,
      Email: email,
      Password: hash,
      Avatar: "",
    });
    return { status: 201, Message: "Account Created Successfully." };
  } catch (error) {
    console.error(error);
    return { status: 500, Message: "Something Went Wrong." };
  }
}

export default createUser;
