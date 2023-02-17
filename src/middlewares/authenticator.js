require('dotenv').config();

const isAuthenticated = (req, res, next) => {
    const chaveAdmin = process.env.KEY_ADM;

    console.log(req.head.Authorization)

    if (chaveAdmin == req.head.Authorization) next();
    else throw new Error("Unauthorized")
}

module.exports = { isAuthenticated };