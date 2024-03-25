require("../models/ForeignKey/Event");
const Event = require("../models/Event");
const EventStatic = require("../models/EventStatic");
const EventDynamic = require("../models/EventDynamic");
const dayjs = require("dayjs");

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
  const event = await Event.findOne({ where: { id } });

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

  const dateRecord = response.isDynamic
    ? response.eventDynamic.date
    : `${response.eventStatic.day}/${response.eventStatic.month}`;

  const date = dayjs(dateRecord).format("DD/MM");
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

  return response.map((obj) => {
    const table = obj.isDynamic ? obj.eventDynamic : obj.eventStatic;
    const date = dayjs(`${table.month}-${table.day}`).format("DD/MM");
    return { ...obj, ...objClear, date };
  });
};

const create = async ({ name, type, date, isDynamic }) => {
  const event = await Event.create({ name, type, isDynamic });
  const dayObj = dayjs(date, "YYYY-MM-DD");

  if (isDynamic) {
    await EventDynamic.create({ date, idEvent: event.id });
  } else {
    await EventStatic.create({
      day: dayObj.date(),
      month: dayObj.month() + 1,
      idEvent: event.id,
    });
  }

  return { ...event.dataValues, date: dayObj.format("DD/MM") };
};

const update = async ({ name, type, date }, id) => {
  const { isDynamic } = await getExistOrThrow(id);
  const dayObj = dayjs(date);

  await Event.update({ name, type }, { where: { id }, raw: true });

  if (!isDynamic && date) {
    await EventStatic.update(
      { day: dayObj.date(), month: dayObj.month() + 1 },
      { where: { idEvent: id } }
    );
  } else if (isDynamic && date) {
    await EventDynamic.update({ date }, { where: { idEvent: id } });
  }

  const response = await getById(id);
  return response;
};

const destroy = (id) => {
  const response = Event.destroy({ where: { id } });
  return response;
};

module.exports = {
  getExistOrThrow,
  getCustomDate,
  getById,
  getAll,
  create,
  update,
  destroy,
};
