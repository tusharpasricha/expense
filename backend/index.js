const appRoutes = require("./src/routes/auth");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 3000;

dotenv.config({
  path: "./.env",
});

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Database connected");
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", appRoutes);

app.listen(port, () => {
  console.log("Server is listening");
});
