import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import Connection from "./db/db.js";
import path from "path";

import { getGlobals } from "common-es";
const { __dirname } = getGlobals(import.meta.url);

// dotenv config
dotenv.config();

// db connection
Connection();

const app = express();

app.use(express.static(path.resolve(__dirname, "build")));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is listening...");
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("Server Started");
});
