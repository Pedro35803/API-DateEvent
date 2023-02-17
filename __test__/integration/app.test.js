const superTest = require("supertest");
const app = require("../../index");

describe("Testes de integração", () => {

    it("GET para /feriados", async () => {
        const response = await superTest(app)
            .get("/api/v1/feriados");

        expect(response.body).toStrictEqual([]);
    });

});