import { Address } from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import { InvoiceEntity } from "../domain/invoice.entity";
import { InvoiceItemEntity } from "../domain/invoiceItem.entity";
import { InvoiceGatewayInterface } from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoiceItem.model";

export class InvoiceRepository implements InvoiceGatewayInterface {
  async find(id: string): Promise<InvoiceEntity> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: [InvoiceItemModel]
    });
    return (
      new InvoiceEntity({
        id: new Id(invoice.id),
        name: invoice.name,
        document: invoice.document,
        address: new Address({
          street: invoice.street,
          number: invoice.number,
          complement: invoice.complement,
          city: invoice.city,
          state: invoice.state,
          zipCode: invoice.zipCode,
        }),
        items: invoice.items.map(
          (item) => new InvoiceItemEntity({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
        ),
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
      })
    );
  }
  async create(invoice: InvoiceEntity): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item: InvoiceItemEntity) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }, {
      include: [InvoiceItemModel]
    });
  }
}