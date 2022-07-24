require('dotenv').config();

const keyAccepted = (chaveDada) => {
    const chaveAdmin = process.env.KEY_ADM;
    const chaveAceita = chaveAdmin == chaveDada;
    return chaveAceita;
}

const menssageDenied = "Operação negada, você não tem acesso de administrador";

module.exports = { keyAccepted, menssageDenied }