import request from "supertest";
import { app, sequelize } from "../express";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel as AdmProductModel } from "../../modules/product-adm/repository/product.model";
import { StoreCatalogProductModel } from "../../modules/store-catalog/repository/product.model";
import { OrderModel } from "../../modules/checkout/repository/order.model";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    // Create a client
    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client@example.com",
      document: "123456789",
      street: "Street 1",
      number: "123",
      complement: "Apt 1",
      city: "City 1",
      state: "State 1",
      zipcode: "12345-678",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create a product in product-adm (for stock and purchase price)
    const admProduct = await AdmProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 Description",
      purchasePrice: 90,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create the same product in store-catalog (for sales price)
    await StoreCatalogProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 Description",
      salesPrice: 100,
    });

    // Perform checkout
    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: client.id,
        products: [{ productId: admProduct.id }],
      });

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.status).toBe("approved");
    expect(response.body.total).toBe(100);

    const order = await OrderModel.findOne({ where: { clientId: client.id } });
    expect(order).toBeDefined();
    expect(order.id).toBe(response.body.id);
  });
});