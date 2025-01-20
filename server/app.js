const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/users");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/UsersData")
  .then(() => console.log("Db connected successfully"))
  .catch((e) => console.log(e));

app.use(cors());

app.use(express.json());

app.use("/", router);

const PORT = 8000;

app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
