import User from "../Models/user.js";
async function search(username) {
  try {
    const users = await User.find({
      username: { $regex: `^${username}`, $options: "i" },
    });
    if (users) {
      return { status: 201, Message: users };
    }
  } catch (error) {
    return { status: 500, Message: "Something Went Wrong." };
  }
}
export default search;
