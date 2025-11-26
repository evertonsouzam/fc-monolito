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

export interface InputFindInvoiceUseCaseDto {
  id: string;
}

export interface OutputFindInvoiceUseCaseDto {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}