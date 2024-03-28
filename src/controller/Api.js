const customParseFormat = require("dayjs/plugin/customParseFormat");
const dayjs = require("dayjs");

dayjs.extend(customParseFormat);

const countEvents = require("../services/countEvents");
const events = require("../database/crud/event");

const {
  getTodayInDayOfYear,
  convertDayAndMothInDayOfYear,
} = require("../services/date");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  async getFeriados(req, res, next) {
    await Events.findAll({
      where: {
        tipo: ["Feriado", "Facultativo"],
      },
    })
      .then((response) => res.json(response))
      .catch(next);
  },

  async getEventsToday(req, res, next) {
    const dayObj = dayjs();

    const whereCommon = {
      day: dayObj.date(),
      month: dayObj.month() + 1,
    };

    const whereComplete = {
      ...whereCommon,
      year: dayObj.year(),
    };

    const response = await events.getCustomDate(whereComplete, whereCommon);
    res.json(response);
  },

  async getRandom(req, res, next) {
    const count = await countEvents();

    if (count === 0) throw new Error("DataBase is empty");

    const id = getRandomInt(1, count);

    await Events.findOne({
      where: { id },
    })
      .then((event) => res.json(event))
      .catch(next);
  },

  async getEventsHandle(req, res, next) {
    const {
      dia_do_ano: dayOfYear,
      dia: day,
      mes: month,
      ano: yearQuery,
    } = req.query;
    const year = Number(yearQuery) || dayjs().year();

    if (dayOfYear && (day || month)) {
      throw new Error("Dia do ano não pode vim acompanhado de dia ou mês");
    } else if (dayOfYear) {
      const dayObj = dayjs(`${year}-01-01`).dayOfYear(dayOfYear);

      if (year !== dayObj.year()) {
        throw new Error("Dia do ano não existente");
      }

      const where = {
        month: dayObj.month() + 1,
        day: dayObj.date(),
      };

      const response = await events.getCustomDate({ ...where, year }, where);
      return res.json(response);
    } else if (day && month) {
      const dateString = `${year}-${month}-${day}`;
      const dayObj = dayjs(dateString, "YYYY-MM-DD", true);

      if (!dayObj.isValid()) {
        throw new Error("Data passada não é valida");
      }

      const where = { day: Number(day), month: Number(month) };
      const response = await events.getCustomDate({ ...where, year }, where);

      return res.json(response);
    } else if (month) {
      if (month < 1 || 12 < month) {
        throw new Error("Mês inexistente");
      }

      const response = await events.getCustomDate({ month });
      return res.json(response);
    } else if (day) {
      throw new Error("É necessário passar na query o mês junto com o dia");
    }

    const response = await events.getCustomDate({ year }, {});
    res.json(response);
  },
};
