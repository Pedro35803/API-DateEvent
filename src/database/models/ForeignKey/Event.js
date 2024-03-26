const Event = require("../Event");
const EventStatic = require("../EventStatic");
const EventDynamic = require("../EventDynamic");
const dayjs = require("dayjs");

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
};

init();
