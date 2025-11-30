import Id from "../../@shared/domain/value-object/id.value-object";
import { Address } from "../../@shared/domain/value-object/address";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import {OrderModel} from "./order.model";
import {ClientModel} from "../../client-adm/repository/client.model";
import { StoreCatalogProductModel } from "../../store-catalog/repository/product.model";


export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    const orderModel: OrderModel & { $set: (property: 'products', value: string[]) => Promise<unknown> } = 
    await OrderModel.create({
      id: order.id.id,
      clientId: order.client.id.id,
      status: order.status,
      invoiceId: order.invoiceId,
    });

    const productIds = order.products.map((p) => p.id.id);
    await orderModel.$set("products", productIds);
  }

  async findOrder(id: string): Promise<Order | null> {
    const order = await OrderModel.findOne({
      where: { id },
      include: ["client", "products"],
    });

    if (!order) {
      return null;
    }

    if (!order.client || !order.products) {
      throw new Error("Order is missing client or products information");
    }

    return new Order({
      id: new Id(order.id),
      client: new Client({
        id: new Id(order.client.id),
        name: order.client.name,
        email: order.client.email,
        document: order.client.document,
        address: new Address({
          street: order.client.street,
          number: order.client.number,
          complement: order.client.complement,
          city: order.client.city,
          state: order.client.state,
          zipCode: order.client.zipcode,
        }),
      }),
      products: order.products.map((item) => {
        return new Product({
          id: new Id(item.id),
          name: item.name,
          description: item.description,
          salesPrice: item.salesPrice,
        });
      }),
      status: order.status,
    });
  }
}