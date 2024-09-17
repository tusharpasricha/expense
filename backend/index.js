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
app.use(cors({
  origin: 'https://spendwiser.vercel.app', // or ['https://spendwiser.vercel.app'] if you need to specify multiple origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if needed
  credentials: true // Enable if you are sending cookies or authorization headers
}));

app.use(bodyParser.json());
app.use("/api", appRoutes);

app.listen(port, () => {
  console.log("Server is listening");
});
