import express from "express";
import indexRoute from "./routes/index.js";
const app = express();
app.use("/api/", indexRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(3030, () => {
  connect();
  console.log("Node server started");
});
