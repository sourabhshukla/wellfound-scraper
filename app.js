const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const product = require("./productRoute");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use("/api/v1", product);

app.use((req, res, next) => {
  console.log(req);
  next(new Error(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
