import { Router } from "express";
import getUser from "../Services/getuser.service.js";

const router = Router();

router.get("/", async (req, res) => {
  const token = req.cookies.NeuCode;
  if (token) {
    try {
      const result = await getUser(token);
      res.status(result.status).send(result.Message);
    } catch (error) {
      res.status(401).json("Something Went Wrong.");
    }
  } else {
    res.status(500).json("Something Went Wrong.");
  }
});

export default router;
