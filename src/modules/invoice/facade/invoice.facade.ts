//import { UseCaseInterface } from "../../@shared";
//import UseCaseInterface from "../../@shared/usecase/use-case.interface";
//import { InvoiceFacadeInterface } from "./invoice.facade.interface";
//import { InputFindInvoiceFacadeDto, OutputFindInvoiceFacadeDto, InputGenerateInvoiceFacadeDto, OutputGenerateInvoiceFacadeDto } from "./InvoiceFacadeDto";
//import { InvoiceFacadeInterface } from "./InvoiceFacadeInterface";

import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { InputFindInvoiceFacadeDto, InputGenerateInvoiceFacadeDto, OutputFindInvoiceFacadeDto, OutputGenerateInvoiceFacadeDto } from "./invoice.facade.dto";
import { InvoiceFacadeInterface } from "./invoice.facade.interface";

interface UseCases {
  findUseCase: UseCaseInterface;
  generateUseCase: UseCaseInterface;
}

export class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _generateUseCase: UseCaseInterface;

  constructor({ findUseCase, generateUseCase }: UseCases) {
    this._findUseCase = findUseCase;
    this._generateUseCase = generateUseCase;
  }

  find(input: InputFindInvoiceFacadeDto): Promise<OutputFindInvoiceFacadeDto> {
    const inputFacade = {
      id: input.id,
    };

    return this._findUseCase.execute(inputFacade);
  }
  generate(input: InputGenerateInvoiceFacadeDto): Promise<OutputGenerateInvoiceFacadeDto> {
    const inputFacade = {
      id: input.id,
      name: input.name,
      document: input.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      items: input.items,
    };

    return this._generateUseCase.execute(inputFacade);
  }
}