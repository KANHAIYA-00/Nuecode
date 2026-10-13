import { Router } from "express";
import { ValidateFileFolder } from "../Functions/Validator.js";
import createFileFolder from "../Services/create_file_folder.service.js";

const router = Router();

router.post("/", async (req, res) => {
  const token = req.cookies.NeuCode;
  if (!token) return res.status(500).json("Something Went Wrong.");

  const validationError = ValidateFileFolder(req.body.name);
  if (validationError) return res.status(400).json(validationError);

  try {
    const result = await createFileFolder(req.body, token);
    res.status(result.status).send(result.Message);
  } catch (error) {
    res.status(500).json("Something Went Wrong.");
  }
});
export default router;
