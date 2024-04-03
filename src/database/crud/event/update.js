const Event = require("../../models/Event");
const EventStatic = require("../../models/EventStatic");
const EventDynamic = require("../../models/EventDynamic");

const { getById, getExistOrThrow } = require("./read");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const dayjs = require("dayjs");

dayjs.extend(customParseFormat);

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

module.exports = { updateType, update };
