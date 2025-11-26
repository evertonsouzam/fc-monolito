import AggregateRootInterface from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import { Address } from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import { InvoiceItemEntity } from "./invoiceItem.entity";

type input = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItemEntity[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class InvoiceEntity extends BaseEntity implements AggregateRootInterface {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: InvoiceItemEntity[];

  constructor({ id, name, document, address, items, createdAt, updatedAt }: input) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._document = document;
    this._address = address;
    this._items = items;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }

  get items(): InvoiceItemEntity[] {
    return this._items;
  }

  get total(): number {
    return this._items.reduce((acc, curr) => acc + curr.price, 0);
  }

  addItem(item: InvoiceItemEntity): void {
    this._items.push(item);
  }

  removeItem(item: InvoiceItemEntity): void {
    this._items = this._items.filter((i) => i.id !== item.id);
  }
}