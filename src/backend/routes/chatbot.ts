import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { message } = req.body;
    // Placeholder: Mock LLM response
    const response = `JARVIS: You said "${message}". I'm still under construction, but I'll be a full-fledged AI soon!`;
    res.json({ response });
});

export default router;