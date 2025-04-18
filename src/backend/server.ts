import express, { Request, Response } from "express";
import chatbotRoutes from "./routes/chatbot";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/chatbot", chatbotRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("JARVIS Chatbot Backend");
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
