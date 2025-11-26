//import { InvoiceFacade } from "../facade";
//import { InvoiceRepository } from "../repository";
//import { FindInvoiceUseCase, GenerateInvoiceUseCase } from "../useCase";

import { InvoiceFacade } from "../facade/invoice.facade";
import { InvoiceRepository } from "../repository/invoice.repository";
import { FindInvoiceUseCase } from "../usecase/findInvoice/find-Invoice.usecase";
import { GenerateInvoiceUseCase } from "../usecase/generateInvoice/generate-invoice.usecase";

export class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);

    return new InvoiceFacade({
      findUseCase: findInvoiceUseCase,
      generateUseCase: generateInvoiceUseCase,
    });
  }
}