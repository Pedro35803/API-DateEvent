const { create } = require("../../src/database/crud/eventos")

const mockDataEvento = {
    nome: "Confraternização Universal",
    tipo: "Feriado",
    diaDoAno: 1
}

jest.mock("../../src/database/sequelize.js", () => {
    return {
        sequelize: new Sequelize("sqlite::memory:")
    }
})

describe("Criação de Usuário", () => {
    it("Criando usuário com sucesso", () => {
        const user = create(mockDataEvento)
        expect(user).toHaveProperty("id");
    })
})