import jwt from "jsonwebtoken";

const deleteCookie = (req, res) => {
  const decoded = jwt.verify(req.cookies.NeuCode, process.env.SECRET_KEY);
  if (decoded) {
    try {
      res.clearCookie("NeuCode");
      return res.status(200).json({ Message: "Signout Successfull." });
    } catch (err) {
      res.status(400).json({ Message: "Something Went Wrong" });
    }
  } else {
    res.status(401).json({ Message: "Invalid token." });
  }
};

export default deleteCookie;
