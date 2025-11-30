import request from "supertest";
import { app, sequelize } from "../express";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { InvoiceItemModel } from "../../modules/invoice/repository/invoiceItem.model";

describe("E2E test for invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should find an invoice", async () => {
    // Create an invoice directly in the database
    const invoice = await InvoiceModel.create({
      id: "1",
      name: "Client 1",
      document: "123456789",
      street: "Street 1",
      number: "123",
      complement: "Apt 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345-678",
      total: 300,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await InvoiceItemModel.create({
      id: "1",
      name: "Product 1",
      price: 100,
      invoice_id: invoice.id,
    });

    await InvoiceItemModel.create({
      id: "2",
      name: "Product 2",
      price: 200,
      invoice_id: invoice.id,
    });

    const response = await request(app).get(`/invoice/${invoice.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe("1");
    expect(response.body.name).toBe("Client 1");
    expect(response.body.document).toBe("123456789");
    expect(response.body.items.length).toBe(2);
    expect(response.body.items[0].name).toBe("Product 1");
    expect(response.body.items[0].price).toBe(100);
    expect(response.body.items[1].name).toBe("Product 2");
    expect(response.body.items[1].price).toBe(200);
    expect(response.body.total).toBe(300);
  });
});