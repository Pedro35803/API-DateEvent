const Event = require("../Event");
const EventStatic = require("../EventStatic");
const EventDynamic = require("../EventDynamic");

Event.hasOne(EventDynamic, {
  foreignKey: "idEvent",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

EventDynamic.belongsTo(Event, {
  foreignKey: "idEvent",
});

Event.hasOne(EventStatic, {
  foreignKey: "idEvent",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

EventStatic.belongsTo(Event, {
  foreignKey: "idEvent",
});

const init = async () => {
  await Event.sync();
  await EventStatic.sync();
  await EventDynamic.sync();

  const eventCreate = await Event.create({
    name: "Dia do futebol",
    type: "Evento Comum",
    isDynamic: false,
  });

  await EventDynamic.create({
    idEvent: eventCreate.id,
    date: "2022-07-19",
  });

  const event = await Event.findOne({
    where: { id: eventCreate.id },
    include: [
      { model: EventDynamic },
      { model: EventStatic },
    ],
    raw: true,
    nest: true
  });

  // const { date } = event.dataValues.eventDynamic.dataValues

  console.log(event);
};
init();
