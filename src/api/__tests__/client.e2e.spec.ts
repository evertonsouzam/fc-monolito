import request from "supertest";
import { app, sequelize } from "../express";
import { ClientModel } from "../../modules/client-adm/repository/client.model";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app)
      .post("/clients")
      .send({
        name: "Client 1",
        email: "client@example.com",
        document: "123456789",
        street: "Street 1",
        number: "123",
        complement: "Apt 1",
        city: "City 1",
        state: "State 1",
        zipcode: "12345-678",
      });

    expect(response.status).toBe(201);

    const client = await ClientModel.findOne({ where: { name: "Client 1" } });
    expect(client).toBeDefined();
    expect(client.name).toBe("Client 1");
    expect(client.email).toBe("client@example.com");
    expect(client.document).toBe("123456789");
    expect(client.street).toBe("Street 1");
    expect(client.city).toBe("City 1");
  });
});