import express from "express";

const app = express();

app.use(express.json())

// Routes
app.use("/", (_, res) => res.status(200).json({msg: "Hello from Bloging Api!"}))

// catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Not found",
  });
});

export default app;