const express = require("express");
const cors = require("cors");
const app = express();
const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());

const bookRouter = require("./app/routes/book.route");
const publisherRouter = require("./app/routes/publisher.route");
const readerRouter = require("./app/routes/reader.route");
const borrowRouter = require("./app/routes/borrow.route");
const staffRouter = require("./app/routes/staff.route");
const authRouter = require("./app/routes/auth.route");

app.use("/api/books", bookRouter);
app.use("/api/publishers", publisherRouter);
app.use("/api/readers", readerRouter);
app.use("/api/borrows", borrowRouter);
app.use("/api/staffs", staffRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to book application." });
});

// Xu ly loi
app.use((req, res, next) => {
  next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});
module.exports = app;
