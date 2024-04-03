const Event = require("../../models/Event");
const EventStatic = require("../../models/EventStatic");
const EventDynamic = require("../../models/EventDynamic");

const customParseFormat = require("dayjs/plugin/customParseFormat");
const dayjs = require("dayjs");

dayjs.extend(customParseFormat);  

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
  const listRecord = await Event.bulkCreate(listEvents);

  listRecord.forEach(async (record) => {
    const event = record.dataValues;

    const { date } = listEvents.find((obj) => obj.name === event.name);
    const dayObj = dayjs(date);

    const data = {
      day: dayObj.date(),
      month: dayObj.month() + 1,
      year: dayObj.year(),
      idEvent: event.id,
      date,
    };

    event.isDynamic
      ? await EventDynamic.create(data)
      : await EventStatic.create(data);
  });

  return listRecord;
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

module.exports = { create, createMany, createDynamic, createManyDynamic };
