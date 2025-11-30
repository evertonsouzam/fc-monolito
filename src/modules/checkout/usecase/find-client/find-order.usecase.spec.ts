import { Address } from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import FindOrderUseCase from "./find-order.usecase";

const order = new Order({
  id: new Id("1"),
  client: new Client({
    id: new Id("1"),
    name: "Client 1",
    email: "x@x.com",
    document: "document 1",  
    address: new Address({ 
         street: "Rua 123",
         number: "99",
         complement: "Casa Verde",
         city: "Criciúma",
         state: "SC",
         zipCode: "88888-888",
    } )  
  }),      
  products: [
    new Product({ id: new Id("1"), name: "item 1", description: "description 1", salesPrice: 10 }), 
    new Product({ id: new Id("2"), name: "item 2", description: "description 2", salesPrice: 20 }),
  ],
  status: "status 1",
});

const MockRepository = () => {
  return {
    addOrder: jest.fn(),
    findOrder: jest.fn().mockReturnValue(Promise.resolve(order)),
  };
};

describe("Find Order Usecase unit test", () => {
  it("should find a order", async () => {
    const repository = MockRepository();
    const usecase = new FindOrderUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(repository.findOrder).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.client.id).toEqual(order.client.id.id);
    expect(result.client.name).toEqual(order.client.name);
    expect(result.client.email).toEqual(order.client.email);
    expect(result.client.document).toEqual(order.client.document);    
    expect(result.client.address).toEqual(order.client.address);
    expect(result.products).toStrictEqual([
        {
          id: order.products[0].id.id, 
          name: order.products[0].name,
          description: order.products[0].description, 
          salesPrice: order.products[0].salesPrice,
        },
        { 
          id: order.products[1].id.id, 
          name: order.products[1].name, 
          description: order.products[1].description,
          salesPrice: order.products[1].salesPrice,
        }, 
    ]);
    expect(result.status).toEqual(order.status);
  });
});