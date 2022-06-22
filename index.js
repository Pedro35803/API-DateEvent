const router = require('./src/routers');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
    console.log("Executando a API, acesse em http://localhost:" + porta);
});