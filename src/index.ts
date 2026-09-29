import cors from "cors";
import express from "express";
import { authRoutes } from "./routes/auth.route.js";
import { postRoutes } from "./routes/post.route.js";
import { userRoutes } from "./routes/user.route.js";
import { globalError, notFoundError } from "./utils/errors.js";

const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json()); // agar bisa menerima req.body

app.get("/api", (req, res) => res.status(200).send("Welcome to my API"));

// entry point
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

// errors
app.use(globalError);
app.use(notFoundError);

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
