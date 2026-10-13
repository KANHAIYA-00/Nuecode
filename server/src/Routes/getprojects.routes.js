import { Router } from "express";
import getProjects from "../Services/getprojects.service.js";

const router = Router();

router.get("/", async (req, res) => {
  const token = req.cookies.NeuCode;
  if (token) {
    try {
      const result = await getProjects(token);
      res.status(result.status).send(result.Message);
    } catch (error) {
      res.status(401).json("Something Went Wrong.");
    }
  } else {
    res.status(500).json("Something Went Wrong.");
  }
});

export default router;
