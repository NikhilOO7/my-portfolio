import express, { Request, Response } from "express";
import chatbotRoutes from "./routes/chatbot";
import contactRoutes from "./routes/contact"; // Add this new import

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/contact", contactRoutes); // Add this new route

app.get("/", (req: Request, res: Response) => {
    res.send("JARVIS Chatbot Backend");
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});