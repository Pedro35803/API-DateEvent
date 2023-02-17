const { Sequelize } = require("sequelize")
const { create } = require("../../src/database/crud/eventos")

const mockDataEvento = {
    nome: "Confraternização Universal",
    tipo: "Feriado",
    diaDoAno: 1
}

const sequelize = new Sequelize('sqlite::memory:');

jest.mock("../../src/database/sequelize.js", () => sequelize)

describe("Criação de Usuário", () => {
    it("Criando usuário com sucesso", () => {
        const user = create(mockDataEvento)
        expect(user).toHaveProperty("id");
    })
})