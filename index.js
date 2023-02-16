const express = require("express");
require("express-async-errors");
const cors = require("cors");

const handleError = require('./src/handleError')
const router = require("./src/router");
  
require('./src/database/sequelize');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.use(handleError);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Starting API in port ${port}`));