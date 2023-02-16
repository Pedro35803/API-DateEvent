const express = require("express");
require("express-async-errors");
const cors = require("cors");

// const handleError = require('./src/handleError')
const router = require("./src/router");

const handleError = function handleError(error, req, res, next) {
    res.status(500);
    console.error(error);
  
    const message = error.message;
  
    const unauthorizedIdentifier = "Unauthorized";
    if (message && message.startsWith(unauthorizedIdentifier)) {
      res.status(401);
    }
  
    res.json({ message, success: false });
}
  
require('./src/database/sequelize');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.use(handleError);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Starting API in port ${port}`));