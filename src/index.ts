import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";

const PORT: number = parseInt(process.env.PORT || "3000");

dotenv.config();
connectDB();

const app: Application = express();
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/* Get full list of homes */
app.get("/homes", (req: Request, res: Response) => {
    res.send("Returning all Homes");
});

app.get("/homes/:id", (req: Request, res: Response) => {
    res.send(`Returning home with ID: ${req.params.id}`);
});

app.post("/homes", (req: Request, res: Response) => {
    res.send("Creating new home");
});
