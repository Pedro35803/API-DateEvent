const router = require('./src/router');
const express = require('express');
const cors = require('cors');

require('./src/database/sequelize');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Starting API in port ${port}`));