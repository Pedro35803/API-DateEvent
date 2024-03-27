require("../models/ForeignKey/Event");
const Event = require("../models/Event");
const EventStatic = require("../models/EventStatic");
const EventDynamic = require("../models/EventDynamic");
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

const create = async ({ name, type, date, isDynamic }) => {
  const format = "YYYY-MM-DD";
  const dayObj = dayjs(date, format, true);

  if (!dayObj.isValid()) {
    throw new Error(`Envie uma data em um formato valido: ${format}`);
  }

  const event = await Event.create({ name, type, isDynamic });

  const objCreate = {
    day: dayObj.date(),
    month: dayObj.month() + 1,
    year: dayObj.year(),
    idEvent: event.id,
    date: date,
  };

  isDynamic
    ? await EventDynamic.create(objCreate)
    : await EventStatic.create(objCreate);

  return { ...event.dataValues, date: dayObj.format("DD/MM") };
};

const createMany = async (listEvents) => {
  const listEvent = await Event.bulkCreate(listEvents);

  listEvent.forEach(async (record) => {
    const event = record.dataValues;

    const { date } = listEvents.find((obj) => obj.name === event.name);
    const { date: dayFunc, month: monthFunc, year: yearFunc } = dayjs(date);
    const data = { day: dayFunc(), month: monthFunc() + 1, year: yearFunc() };

    event.isDynamic
      ? await EventStatic.create({ ...data, date, idEvent: event.id })
      : await EventDynamic.create({ ...data, idEvent: event.id });
  });

  return listEvent;
};

const createDynamic = async ({ date, idEvent }) => {
  const format = "YYYY-MM-DD";
  const dayObj = dayjs(date, format, true);

  if (!dayObj.isValid()) {
    throw new Error(`Envie uma data em um formato valido: ${format}`);
  }

  const data = {
    day: dayObj.date(),
    month: dayObj.month() + 1,
    year: dayObj.year(),
  };

  const response = await EventDynamic.findOrCreate({
    where: { idEvent, year: data.year },
    defaults: { ...data, date, idEvent },
  });
  return response;
};

const createManyDynamic = async (listRecord) => {
  const response = Promise.all(
    listRecord.map(async (record) => await createDynamic(record))
  );
  return response;
};

const update = async ({ name, type, date }, id) => {
  const { isDynamic } = await getExistOrThrow(id);
  const dayObj = dayjs(date);

  await Event.update({ name, type }, { where: { id }, raw: true });

  const objUpdate = { day: dayObj.date(), month: dayObj.month() + 1 };

  if (!isDynamic && date) {
    await EventStatic.update(objUpdate, { where: { idEvent: id } });
  } else if (isDynamic && date) {
    await EventDynamic.update(
      { ...objUpdate, date, year: dayObj.year() },
      { where: { idEvent: id } }
    );
  }

  const response = await getById(id);
  return response;
};

const updateType = async ({ isDynamic, year: yearUse }, id) => {
  const event = await getExistOrThrow(id);
  const year = yearUse || dayjs().year();

  const dataTableType = event.isDynamic
    ? event.eventDynamic
    : event.eventStatic;

  const data = { year, ...dataTableType };

  await Event.update({ isDynamic }, { where: { id } });
  const where = { idEvent: id };

  console.log(data);

  if (isDynamic) {
    event.eventStatic.idEvent && (await EventStatic.destroy({ where }));
    await EventDynamic.findOrCreate({ defaults: data, where });
  } else {
    event.eventDynamic.idEvent && (await EventDynamic.destroy({ where }));
    await EventStatic.findOrCreate({ defaults: data, where });
  }

  const response = await getExistOrThrow(id);
  return response;
};

const destroy = (id) => {
  const response = Event.destroy({ where: { id } });
  return response;
};

module.exports = {
  getExistOrThrow,
  getCustomDate,
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
