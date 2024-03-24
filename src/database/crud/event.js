require("../models/ForeignKey/Event");
const Event = require("../models/Event");
const EventStatic = require("../models/EventStatic");
const EventDynamic = require("../models/EventDynamic");
const dayjs = require("dayjs");

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

  const objClear = {
    isDynamic: undefined,
    eventDynamic: undefined,
    eventStatic: undefined,
  };

  const dateRecord = response.isDynamic
    ? response.eventDynamic.date
    : `${response.eventStatic.day}/${response.eventStatic.month}`;

  const date = dayjs(dateRecord).format("DD/MM");
  return { ...response, ...objClear, date };
};

const create = async ({ name, type, date, isDynamic }) => {
  const event = await Event.create({ name, type, isDynamic });
  const dayObj = dayjs(date);

  if (isDynamic) {
    await EventDynamic.create({ date, idEvent: event.id });
  } else {
    await EventStatic.create({
      day: dayObj.day(),
      month: dayObj.month(),
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
      { day: dayObj.day(), month: dayObj.month() },
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

module.exports = { getAll, getById, getExistOrThrow, create, update, destroy };
