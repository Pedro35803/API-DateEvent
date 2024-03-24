const express = require("express");
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");

const handleError = require("./middlewares/handleError");
const routerHandle = require("./router/handle");
const routerAPI = require("./router/api");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/handle", routerHandle);
app.use("/api/v1", routerAPI);
app.use(handleError);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Starting API in port ${port}`));
