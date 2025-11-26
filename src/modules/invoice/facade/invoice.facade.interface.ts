import { InputFindInvoiceFacadeDto, InputGenerateInvoiceFacadeDto, OutputFindInvoiceFacadeDto, OutputGenerateInvoiceFacadeDto } from "./invoice.facade.dto";

export interface InvoiceFacadeInterface {
  find(input: InputFindInvoiceFacadeDto): Promise<OutputFindInvoiceFacadeDto>;
  generate(input: InputGenerateInvoiceFacadeDto): Promise<OutputGenerateInvoiceFacadeDto>;
}