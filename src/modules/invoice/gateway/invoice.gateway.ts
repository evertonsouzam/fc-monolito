//import { InvoiceEntity } from "../domain";

import { InvoiceEntity } from "../domain/invoice.entity";

export interface InvoiceGatewayInterface {
  find(id: string): Promise<InvoiceEntity>;
  create(invoice: InvoiceEntity): Promise<void>;
}