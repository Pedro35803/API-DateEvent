async function isAuthenticated (req, res, next) {
    const chaveAdmin = process.env.KEY_ADM;

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if (chaveAdmin === token) next();
    else throw new Error("Unauthorized")
}

module.exports = isAuthenticated;