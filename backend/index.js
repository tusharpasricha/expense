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

const allowedOrigins = [
  'https://spendwiser.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Check if the origin is in the allowedOrigins array or if it's not defined (e.g., requests from mobile apps)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

app.use(bodyParser.json());
app.use("/api", appRoutes);

app.listen(port, () => {
  console.log("Server is listening");
});
