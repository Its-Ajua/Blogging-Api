import "express-async-errors";
import express from "express";

import authRoute from "./routes/auth.route.js";
import blogRoute from "./routes/blog.route.js";
import { configureErrorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json())

// Routes
app.get("/", (_req, res) => res.status(200).json({msg: "Hello from Bloging Api!"}))
app.use("/auth", authRoute);
app.use("/blogs", blogRoute)

// Error Handling
configureErrorMiddleware(app);

export default app;