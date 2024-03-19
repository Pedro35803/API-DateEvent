const Admin = require("../models/Admin");

const getAll = async () => {
  const response = await Admin.findAll();
  return response;
};

const getById = async (id) => {
  const response = await Admin.findOne({ where: { id } });
  return response;
};

const create = async ({ email, password, type }) => {
  const response = await Admin.create({ email, password, type });
  return response;
};

const update = async ({ email, password, type }, id) => {
  const update = {};

  if (type) update.type = type;
  if (email) update.email = email;
  if (password) update.password = password;

  const response = await Admin.update(update, { where: { id } });

  return response;
};

const destroy = (id) => {
  const response = Admin.destroy({ where: { id } });
  return response;
};

module.exports = { getAll, getById, create, update, destroy };
