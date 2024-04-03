const Event = require("../../models/Event");
const EventStatic = require("../../models/EventStatic");
const EventDynamic = require("../../models/EventDynamic");

const customParseFormat = require("dayjs/plugin/customParseFormat");
const dayjs = require("dayjs");

dayjs.extend(customParseFormat);  

const objClear = {
  isDynamic: undefined,
  eventDynamic: undefined,
  eventStatic: undefined,
};

const getAll = async () => {
  const response = await Event.findAll({
    include: [EventDynamic, EventStatic],
    nest: true,
    raw: true,
  });
  return response;
};

const getExistOrThrow = async (id) => {
  const event = await Event.findOne({
    include: [EventDynamic, EventStatic],
    where: { id },
    nest: true,
    raw: true,
  });

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};

const getById = async (id) => {
  const response = await Event.findOne({
    include: [EventDynamic, EventStatic],
    where: { id },
    nest: true,
    raw: true,
  });

  const table = response.isDynamic
    ? response.eventDynamic
    : response.eventStatic;

  const dateString = `${table.month}-${table.day}`;
  const date = dayjs(dateString).format("DD/MM");
  return { ...response, ...objClear, date };
};

const getCustomDate = async (whereDynamic, whereStatic = whereDynamic) => {
  const response = await Event.findAll({
    include: [
      {
        model: EventDynamic,
        where: whereDynamic,
        required: false,
      },
      {
        model: EventStatic,
        where: whereStatic,
        required: false,
      },
    ],
    nest: true,
    raw: true,
  });

  return response
    .map((obj) => {
      const table = obj.isDynamic ? obj.eventDynamic : obj.eventStatic;
      if (table.idEvent) {
        const date = dayjs(`${table.month}-${table.day}`).format("DD/MM");
        return { ...obj, ...objClear, date };
      }
      return undefined;
    })
    .filter((obj) => obj !== undefined);
};

const getHoliday = async (year) => {
  const response = await Event.findAll({
    where: {
      type: ["Feriado", "Facultativo"],
    },
    include: [{ model: EventDynamic, where: { year } }, { model: EventStatic }],
    nest: true,
    raw: true,
  });

  return response.map((record) => {
    const table = record.isDynamic ? record.eventDynamic : record.eventStatic;
    const dateString = `${table.month}-${table.day}`;
    const date = dayjs(dateString).format("DD/MM");
    return { ...record, ...objClear, date };
  });
};

const getCountEvents = async () => {
  const response = await Event.findAndCountAll();
  return response.count;
};

module.exports = {
  getExistOrThrow,
  getCountEvents,
  getCustomDate,
  getHoliday,
  getById,
  getAll,
};
