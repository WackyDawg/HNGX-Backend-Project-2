const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); 
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const PORT = process.env.PORT || 3000; 

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./router/router.js");
app.use(router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("⚡ Successfully Connected To MongoDB 🚀");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server is Up and Running on Port ${PORT}`);
});

module.exports = app;
