// express configureations

import express from "express";

const app = express();

app.route("/health").get((_, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

export default app;
