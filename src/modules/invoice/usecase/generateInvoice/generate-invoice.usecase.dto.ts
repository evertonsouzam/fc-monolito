type Address = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

type InvoiceItem = {
  id: string;
  name: string;
  price: number;
};

export interface InputGenerateInvoiceUseCaseDto {
  id?: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: InvoiceItem[];
}

export interface OutputGenerateInvoiceUseCaseDto {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}