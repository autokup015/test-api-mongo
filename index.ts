import "dotenv/config";
import express, { Request, Response } from "express";
import { Error } from "mongoose";
import { endpoint } from "./endpoint";

const app = express();
const bodyParser = require("body-parser");
const core = require("cors");
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(core());

// --------------------------- mongoose ---------------------------

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(endpoint.CONNECT_MONGO)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err: Error) => {
    console.log("mongodb error", err);
  });

// ---------------------------------------------------------------------------------

const employee = require("./routers/employee");

// --------------------------- First Get api ---------------------------

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World naja!");
});

// --------------------------- Modules ---------------------------

app.use("/employee", employee);

// ---------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
