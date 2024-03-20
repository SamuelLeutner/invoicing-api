const request = require("supertest");
const app = require("../../../main.js");
const BaseTest = require('../../../Core/Service/BaseTest.js')
const make = new BaseTest()

describe("Products", () => {
    it("should return 201 when create a product", async () => {
        const response = await request(app).post("/api/product")
            .send({
                name: "Product 1",
                price: 100.00,
                quantity: 10,
            });
        expect(response.statusCode).toBe(201);
    });
});