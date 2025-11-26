import { Address } from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { InvoiceEntity } from "../../domain/invoice.entity";
import { InvoiceItemEntity } from "../../domain/invoiceItem.entity";
import { InvoiceGatewayInterface } from "../../gateway/invoice.gateway";
import { InputGenerateInvoiceUseCaseDto, OutputGenerateInvoiceUseCaseDto } from "./generate-invoice.usecase.dto";

export class GenerateInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGatewayInterface;

  constructor(invoiceRepository: InvoiceGatewayInterface) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: InputGenerateInvoiceUseCaseDto): Promise<OutputGenerateInvoiceUseCaseDto> {
    const invoice = new InvoiceEntity({
      ...(input.id && { id: new Id(input.id) }),
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: input.items.map((item) => new InvoiceItemEntity({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      })),
    });
    await this._invoiceRepository.create(invoice);
    return OutputMapper.toOutput(invoice);
  }
}

class OutputMapper {
  static toOutput(invoiceItems: InvoiceEntity): OutputGenerateInvoiceUseCaseDto {
    return {
      id: invoiceItems.id.id,
      name: invoiceItems.name,
      document: invoiceItems.document,
      address: invoiceItems.address,
      items: invoiceItems.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoiceItems.total,
      createdAt: invoiceItems.createdAt,
      updatedAt: invoiceItems.updatedAt,
    };
  }
}