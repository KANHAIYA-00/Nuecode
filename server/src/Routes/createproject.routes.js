import { Router } from "express";
import { ValidateProject } from "../Functions/Validator.js";
import createProject from "../Services/createproject.service.js";

const router = Router();

router.post("/", async (req, res) => {
  const token = req.cookies.NeuCode;
  if (!token) return res.status(500).json("Something Went Wrong.");

  const validationError = ValidateProject(req.body);
  if (validationError) return res.status(400).json(validationError);

  try {
    const result = await createProject(req.body, token);
    res.status(result.status).send(result.Message);
  } catch (error) {
    res.status(500).json("Something Went Wrong.");
  }
});
export default router;
