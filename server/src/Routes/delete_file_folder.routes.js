import { Router } from "express";
import deleteFileFolder from "../Services/delete_file_folder.service.js";

const router = Router();

router.post("/", async (req, res) => {
  const token = req.cookies.NeuCode;
  if (!token) return res.status(500).json("Something Went Wrong.");

  try {
    const result = await deleteFileFolder(req.body, token);
    res.status(result.status).send(result.Message);
  } catch (error) {
    res.status(500).json("Something Went Wrong.");
  }
});
export default router;
