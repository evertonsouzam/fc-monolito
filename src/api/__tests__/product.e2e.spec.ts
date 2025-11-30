import request from "supertest";
import { app, sequelize } from "../express";
import { ProductModel } from "../../modules/product-adm/repository/product.model";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Product 1",
        description: "Product 1 Description",
        purchasePrice: 100,
        stock: 10,
      });

    expect(response.status).toBe(201);

    const product = await ProductModel.findOne({ where: { name: "Product 1" } });
    expect(product).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Product 1 Description");
    expect(product.purchasePrice).toBe(100);
    expect(product.stock).toBe(10);
  });
});