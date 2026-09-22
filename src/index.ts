import express from "express";
import { globalError, notFoundError } from "./utils/errors.js";
import { userRoutes } from "./routes/user.route.js";

const PORT = 8000;

const app = express();

app.use(express.json()); // agar bisa menerima req.body

app.get("/api", (req, res) => {
  res.status(200).send("Welcome to my API");
});

// entry point
app.use("/users", userRoutes);

// errors
app.use(globalError);
app.use(notFoundError);

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
