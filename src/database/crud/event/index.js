require("../../models/ForeignKey/Event");

const {
  create,
  createMany,
  createDynamic,
  createManyDynamic,
} = require("./create");

const {
  getAll,
  getById,
  getHoliday,
  getCustomDate,
  getCountEvents,
  getExistOrThrow,
} = require("./read");

const { update, updateType } = require("./update");

const { destroy } = require("./delete")

module.exports = {
  getExistOrThrow,
  getCountEvents,
  getCustomDate,
  getHoliday,
  updateType,
  getById,
  getAll,
  create,
  update,
  destroy,
  createMany,
  createDynamic,
  createManyDynamic,
};
