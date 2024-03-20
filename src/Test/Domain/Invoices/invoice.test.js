const request = require("supertest");
const app = require("../../../main.js");
const BaseTest = require('../../../Core/Service/BaseTest.js')
const make = new BaseTest()

describe("Invoices", () => {
  it("should return 201 when create an invoice", async () => {
    const user = await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    })

    const product = await make.product({
      name: "Product 1",
      price: 100.00,
      quantity: 10,
      user_id: user._id,
    });

    const response = await request(app).post('/api/invoice?api_token=' + user.api_token)
      .send({
        products: [{
          id: product._id.toHexString(),
          name: product.name,
          quantity: 2,
        }]
      });

    const products = JSON.parse(response.text);
    expect(response.statusCode).toBe(201);
    expect(products.products.length).toBe(1);
    expect(products.payment_status).toBe('unpaid');
  });

  it("should list invoices", async () => {
    const user = await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    });

    const product = await make.product({
      name: "Product 1",
      price: 100.00,
      quantity: 10,
      user_id: user._id,
    });

    const product2 = await make.product({
      name: "Product 2",
      price: 10.00,
      quantity: 2,
      user_id: user._id,
    });

    await make.invoice({
      user_id: user._id,
      products: [
        {
          id: product._id,
          name: product.name,
          quantity: 2,
        },
        {
          id: product2._id,
          name: product2.name,
          quantity: 2,
        }
      ]
    });

    const getResponse = await request(app).get('/api/invoice?api_token=' + user.api_token);

    const invoices = JSON.parse(getResponse.text).items;
    expect(getResponse.statusCode).toBe(200);
    expect(invoices.length).toBe(1);
    expect(invoices[0].products.length).toBe(2)
    expect(invoices[0].payment_status).toBe('unpaid');
  });

  it("should update an invoice", async () => {
    const user = await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    });

    const product = await make.product({
      name: "Product 1",
      price: 100.00,
      quantity: 10,
      user_id: user._id,
    });

    const product2 = await make.product({
      name: "Product 2",
      price: 10.00,
      quantity: 4,
      user_id: user._id,
    });

    const invoice = await make.invoice({
      user_id: user._id,
      products: [
        {
          id: product._id,
          name: product.name,
          quantity: 2,
        }
      ]
    });

    const updateInvoice = {
      products: [
        {
          id: product._id,
          name: product.name,
          quantity: 5,
        },
        {
          id: product2._id,
          name: product2.name,
          quantity: 6,
        }
      ]
    }

    const response = await request(app).put('/api/invoice/' + invoice._id.toHexString() + '?api_token=' + user.api_token)
      .send({
        payment_status: 'paid',
        products: updateInvoice.products,
      });

    expect(response.statusCode).toBe(204);
  });

  it("should delete an invoice", async () => {
    const user = await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    });

    const product = await make.product({
      name: "Product 1",
      price: 100.00,
      quantity: 10,
      user_id: user._id,
    });

    const invoice = await make.invoice({
      user_id: user._id,
      products: [
        {
          id: product._id,
          name: product.name,
          quantity: 2,
        }
      ]
    });

    const response = await request(app).delete('/api/invoice/' + invoice._id.toHexString() + '?api_token=' + user.api_token);
    expect(response.statusCode).toBe(204);
  })
});