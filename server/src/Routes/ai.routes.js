import { Router } from "express";
import gemini from "../Services/ai.service.js";
const router = Router();

router.post("/review", async (req, res) => {
  const { query } = req.body;
  if (query) {
    try {
      const result = await gemini(query.prompt);
      res.status(200).send(result);
    } catch (error) {
      console.error("Error calling Gemini:", error);
    }
  }
});
export default router;
