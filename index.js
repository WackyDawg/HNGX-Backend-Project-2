const express = require("express");
const router = require("./router/router.js"); 
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); 
const cors = require("cors");
require("dotenv").config();

const PORT = 3000;

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("⚡Successfully Connected To MongoDB🚀");
  })
  .catch((err) => {
    console.error(err); 
  });

//app.use(require('express-status-monitor')());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(router); 

app.listen(PORT, async () => {
  console.log(`🚀Server is Up and Running on ${PORT}`);
});

module.exports = app;
