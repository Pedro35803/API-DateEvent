const { Sequelize, DataTypes } = require("sequelize")
const { create, update } = require("../../src/database/crud/eventos")

const database = new Sequelize("sqlite::memory:");

const initDb = async () => {
	try {
    await database.authenticate();
		await database.sync({ force: true });
	} catch (error) {
		console.error(error);
	}
};

database.define('eventos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(255),
      defaultValue: 'Evento Comum'
    },
    diaDoAno: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
});

const eventObj = {
    nome: "Confraternização Universal",
    tipo: "Feriado",
    diaDoAno: 1
}

beforeAll(async () => {
  await initDb();
});

afterAll(async () => {
  await initDb();
});

describe("Criação de Evento", () => {
  it("Criando evento com sucesso ao dar todos os dados", async () => {
      const event = await create(eventObj);
      expect(event).toHaveProperty("id");
  })

  it("Criando evento com sucesso ao faltar tipo nos dados", async () => {
    const event = await create({
      nome: eventObj.nome,
      diaDoAno: eventObj.diaDoAno
    });
    expect(event).toHaveProperty("id");
  })

  it("Barrando criação de evento se já existe evento no DB", async () => {
      await create(eventObj);
      const event = await create(eventObj);
      console.log(event)
      expect(event).toHaveProperty("id");
  })

  it("Barrando criação de evento ao faltar diaDoAno no evento de criação", async () => {
      await expect(
          create({
              nome: eventObj.nome,
              tipo: eventObj.tipo,
          })
      ).rejects.toBeInstanceOf(Error);
  })

  it("Barrando criação de evento ao faltar nome no evento de criação", async () => {
    await expect(
        create({ diaDoAno: eventObj.diaDoAno })
    ).rejects.toBeInstanceOf(Error);
  })
})

describe("Edição de Evento", () => {
  it("Editando nome do evento com sucesso", async () => {
    const newName = "Ano Novo";

    const event = await create(eventObj);
    const newEvent = await update({ nome: newName }, event.dataValues.id)
    console.log(newEvent)
    
    expect(newEvent.nome).toBe(newName)
  })

  it("Editando tipo do evento com sucesso", async () => {
    const newType = "Facultativo";

    const event = await create(eventObj);
    const newEvent = await update({ tipo: newType }, event.dataValues.id)

    expect(newEvent.tipo).toBe(newType)
  })

  it("Editando diaDoAno do evento com sucesso", async () => {
    const newDayOfYear = "31";

    const event = await create(eventObj);
    const newEvent = await update({ diaDoAno: newDayOfYear }, event.dataValues.id)

    expect(newEvent.diaDoAno).toBe(newDayOfYear)
  })

  it("Editando todo os dados do evento com sucesso", async () => {
    const newObjEvent = {
      nome: "Dia do futebol",
      tipo: "Evento Comum",
      diaDoAno: 200
    }

    const event = await create(eventObj);
    const newEvent = await update(newObjEvent, event.dataValues.id)
    console.log("oi")
    console.log(newEvent)

    expect(newEvent.nome).toBe(newObjEvent.nome)
    expect(newEvent.tipo).toBe(newObjEvent.tipo)
    expect(newEvent.diaDoAno).toBe(newObjEvent.diaDoAno)
  })
})