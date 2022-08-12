require('dotenv').config();

const menssageDenied = "Operação negada, você não tem acesso de administrador";

const isAuthenticated = (req, res, next) => {
    const chaveAdmin = process.env.KEY_ADM;

    if (chaveAdmin == req.params.key) {
        next();
    } else {
        res.status(403).send(menssageDenied);
    }
}

module.exports = { isAuthenticated };