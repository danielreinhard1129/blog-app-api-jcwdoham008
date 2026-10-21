import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { corsOptions } from "./config/cors.js";
import { authRoutes } from "./routes/auth.route.js";
import { postRoutes } from "./routes/post.route.js";
import { transactionRoutes } from "./routes/transaction.route.js";
import { userRoutes } from "./routes/user.route.js";
import { globalError, notFoundError } from "./utils/errors.js";
import { expiredTransactionCron } from "./scripts/transaction.js";

const PORT = 8000;

const app = express();

app.use(cors(corsOptions));
app.use(express.json()); // agar bisa menerima req.body
app.use(cookieParser());

app.get("/api", (req, res) => res.status(200).send("Welcome to my API"));

// entry point
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

// errors
app.use(globalError);
app.use(notFoundError);

// crons
expiredTransactionCron();

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
