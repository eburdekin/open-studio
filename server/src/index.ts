import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.ATLAS_URI as string);

const PORT = process.env.PORT || 7000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello!" });
});

// app.use("/api/classes", classRoute);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
