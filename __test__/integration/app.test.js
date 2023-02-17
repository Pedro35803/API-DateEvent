const superTest = require("supertest");
const app = require("../../index");

describe("Testes de integração", () => {

    it("GET para /feriados", async () => {
        const response = await superTest(app)
            .get("/api/v1/feriados");

        expect(response.body).toStrictEqual([]);
    });

    it("GET para /eventos/hoje", async () => {
        const response = await superTest(app)
            .get("/api/v1/eventos/hoje");

        expect(response.body).toStrictEqual([]);
    });

    it("GET para /eventos/diaDoAno", async () => {
        const response = await superTest(app)
            .get("/api/v1/eventos/diaDoAno/1");

        expect(response.body).toStrictEqual([]);
    });

});