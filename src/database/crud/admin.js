const { hash } = require("bcrypt");

const Admin = require("../models/Admin");

const attributes = { exclude: ["password"] };

const getAll = async () => {
  const response = await Admin.findAll({ attributes });
  return response;
};

const getById = async (id) => {
  const response = await Admin.findOne({ where: { id }, attributes });
  return response;
};

const getByEmail = async (email) => {
  const response = await Admin.findOne({ where: { email } });
  return response;
};

const create = async ({ email, password, type }) => {
  const passwordHash = await hash(password, 10);
  const response = await Admin.create({
    type,
    email,
    password: passwordHash,
  });
  return { ...response.dataValues, password: undefined };
};

const update = async ({ email, password, type }, id) => {
  const update = {
    type,
    email,
    password: password ? hash(password) : undefined,
  };

  await Admin.update(update, { where: { id } });
  const response = await getById(id);

  return response;
};

const destroy = async (id) => {
  const response = await Admin.destroy({ where: { id } });
  return response;
};

module.exports = { getAll, getByEmail, getById, create, update, destroy };
