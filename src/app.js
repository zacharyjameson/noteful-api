require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { NODE_ENV } = require("./config");
const foldersRouter = require("./folders/folders-router");
const noteRouter = require("./notes/notes-router");
const errorHandler = require("./error-handler");

const app = express();

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => (NODE_ENV) => "test",
  })
);

app.use(cors());
app.use(helmet());

app.use("/api/folder/", foldersRouter);
app.use("/api/note/", noteRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(errorHandler);

module.exports = app;
