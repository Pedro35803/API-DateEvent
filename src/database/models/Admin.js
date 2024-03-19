const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const bcrypt = require("bcrypt");

const Admin = sequelize.define("admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(["simple", "superAdmin"]),
    allowNull: false,
  },
});

const init = async () => {
  await Admin.sync();
  const allAdmin = await Admin.findAll();

  if (allAdmin.length === 0) {
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await Admin.create({
      password: passwordHash,
      email: ADMIN_EMAIL,
      type: "superAdmin",
    });
  }
};

init();

module.exports = Admin;
