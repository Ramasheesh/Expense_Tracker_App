require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
//routes
const userRoutes = require("./v1/routes/user");
const incomeRoutes = require("./v1/routes/income");
const expenseRoutes = require("./v1/routes/expense");
const dashboardRoutes = require('./v1/routes/dashboard');

const database = require("./connections/dbConnection");
const Response = require("./utility/response");
const bodyParser = require('body-parser')
const port = process.env.PORT || 2000;
const path = require("path");

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
// global error defining
app.use(function (err, req, res, next) {
  console.log(err);
  const status = err.status || 400;
  if (err.message == "jwt expired" || err.message == "Authentication error") {
    res.status(401).send({ status: 401, message: err });
  }
  if (err.Error) {
    res.status(status).send({ status: status, message: err.Error });
  } else if (err.message) {
    res.status(status).send({ status: status, message: err.message });
  } else {
    {
      res.status(status).send({ status: status, message: err.message });
    }
  }
  next(err);
});

app.use("/", function (req, res) {
  res
    .status(400)
    .send({
      code: 400,
      status: "Bad Request",
      message: "Something Pending in Routes",
      data: {},
    });
});

app.listen(port, async () => {
  try {
    console.log(`Server is Listening at port... http://localhost:${port}`);
    await database.MongoDbConnection();
  } catch (error) {
    throw error;
  }
});
