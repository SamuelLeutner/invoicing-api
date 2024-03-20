const request = require("supertest");
const app = require("../../../main.js");
const BaseTest = require('../../../Core/Service/BaseTest.js');
const make = new BaseTest()

describe("Products", () => {
  it("should return 201 when create a product", async () => {
    const user = await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    })

    const response = await request(app).post("/api/product?api_token=" + user.api_token)
      .send({
        name: "Product 1",
        price: 100.00,
        quantity: 10,
      });

    expect(response.statusCode).toBe(201);
  });

  it("should return 422 when field is missing", async () => {
    const user = await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    })

    const response = await request(app).post("/api/product?api_token=" + user.api_token)
      .send({
        price: 100.00,
        quantity: 10,
      });

    const message = JSON.parse(response.text);
    expect(response.statusCode).toBe(422);
    expect(message.error).toBe("The name field is required.");
  });

  it("should list product", async () => {
    const user = await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    });

    const product = await make.product({
      name: "Product 1",
      price: 1.590,
      quantity: 5,
      user_id: user._id,
    });

    await make.product({
      name: "Product 2",
      price: 190,
      quantity: 1,
      user_id: user._id,
    });

    const getResponse = await request(app).get("/api/product?api_token=" + user.api_token);
    const items = JSON.parse(getResponse.text).items;
    expect(getResponse.statusCode).toBe(200);
    expect(items.length).toBe(2)

    const showResponse = await request(app).get("/api/product/" + product._id.toHexString() + "?api_token=" + user.api_token)
    const itemId = JSON.parse(showResponse.text).item._id;
    expect(showResponse.statusCode).toBe(200);
    expect(itemId).toBe(product._id.toHexString())
  });

  it("should update an product", async () => {
    const user = await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    });

    const product = await make.product({
      name: "Product 1",
      price: 1.590,
      quantity: 5,
      user_id: user._id,
    });

    const response = await request(app).put("/api/product/" + product._id.toHexString() + "?api_token=" + user.api_token)
      .send({
        name: "New Product",
        price: 100,
        quantity: 2,
      });

    expect(response.statusCode).toBe(204);
  });

  it("should delete an product", async () => {
    const user = await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    });

    const product = await make.product({
      name: "Product to delete",
      price: 190,
      quantity: 3,
      user_id: user._id,
    });

    const response = await request(app).delete("/api/product/" + product._id.toHexString() + "?api_token=" + user.api_token);
    expect(response.statusCode).toBe(204);
  });
});
