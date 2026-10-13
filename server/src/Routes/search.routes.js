import { Router } from "express";
import search from "../Services/search.service.js";
const router = Router();
app.get("/", async (req, res) => {
  const { username } = req.query;
  try {
    const result = await search(username);
    res.status(result.status).json(result.Message);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
