const basicAuth = require("basic-auth");

const { getByEmail: findAdmin } = require("../database/crud/admin");
const { compare } = require("bcrypt");

const authorization = async (req, res, next) => {
  const adminAuth = basicAuth(req);

  if (!adminAuth) {
    const message = "Authorization Required";
    res.set("WWW-Authenticate", `Basic realm="${message}"`);
    return res.status(401).send({ message, success: false });
  }

  const admin = await findAdmin(adminAuth.name);
  const isEmailValid = adminAuth.name === admin.email;
  const isPassValid = await compare(adminAuth.pass, admin.password);

  if (!isEmailValid || !isPassValid) {
    return res.status(403).send({
      message: "Email or password incorrect",
      success: false,
    });
  }

  res.locals.adminId = admin.id;
  res.locals.adminType = admin.type;
  next();
};

module.exports = authorization;
