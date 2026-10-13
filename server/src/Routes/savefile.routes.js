import { Router } from "express";
import saveFile from "../Services/savefile.service.js";

const router = Router();

router.post("/", async (req, res) => {
  const token = req.cookies.NeuCode;
  if (token) {
    try {
      const result = await saveFile(req.body, token);
      res.status(result.status).send(result.Message);
    } catch (error) {
      res.status(401).json("Something Went Wrong.");
    }
  } else {
    res.status(500).json("Something Went Wrong.");
  }
});

export default router;
