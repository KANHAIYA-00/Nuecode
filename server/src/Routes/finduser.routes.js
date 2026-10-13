import { Router } from "express";
import findUser from "../Services/finduser.service.js";
import { ValidateUsername, ValidatePassword } from "../Functions/Validator.js";
const router = Router();

function validation(data) {
  const nameError = ValidateUsername(data.username);
  if (nameError) {
    return nameError;
  }
  const passwordError = ValidatePassword(data.password);
  if (passwordError) {
    return passwordError;
  }
  return true;
}
router.post("/", async (req, res) => {
  const data = req.body;
  const isValid = validation(data);
  if (isValid === true) {
    try {
      const result = await findUser(data, res);
      res.status(result.status).send(result.Message);
    } catch (error) {
      res.status(500).json("Something Went Wrong.");
    }
  } else {
    res.status(400).json(isValid);
  }
});
export default router;
