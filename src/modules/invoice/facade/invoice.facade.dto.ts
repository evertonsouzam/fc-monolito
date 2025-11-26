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

export interface InputFindInvoiceFacadeDto {
  id: string;
}

export interface OutputFindInvoiceFacadeDto {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface InputGenerateInvoiceFacadeDto {
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

export interface OutputGenerateInvoiceFacadeDto {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}