import express from "express";

const app = express();

app.listen(3030, () => {
  connect();
  console.log("Node server started");
});
