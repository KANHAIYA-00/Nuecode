import { Router } from "express";
import getPublicProjects from "../Services/getpublicprojects.service.js";

const router = Router();

router.get("/", async (req, res) => {
  const token = req.cookies.NeuCode;
  if (token) {
    try {
      const result = await getPublicProjects(token);
      res.status(result.status).send(result.Message);
    } catch (error) {
      res.status(401).json("Something Went Wrong.");
    }
  } else {
    res.status(500).json("Something Went Wrong.");
  }
});

export default router;
