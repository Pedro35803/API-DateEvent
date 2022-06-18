const express = require('express');
const router = express.Router();

const resTemp = [{Hello: "World"}]

router.get('/', (req, res) => {
    return res.send(resTemp);
});

module.exports = router;