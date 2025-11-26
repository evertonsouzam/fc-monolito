import ValueObjectInteface from "./value-object.interface";
type input = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

export class Address implements ValueObjectInteface {
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;

  constructor({
    street,
    number,
    complement,
    city,
    state,
    zipCode,
  }: input) {
    this._street = street;
    this._number = number;
    this._complement = complement;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get complement(): string {
    return this._complement;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get fullAddress(): string {
    return `${this._street}, ${this._number}, ${this._complement}, ${this._city}, ${this._state}, ${this._zipCode}`;
  }

  validate(): void {
    if (!this._street) {
      throw new Error("Street is required");
    }
    if (!this._number) {
      throw new Error("Number is required");
    }
    if (!this._complement) {
      throw new Error("Complement is required");
    }
    if (!this._city) {
      throw new Error("City is required");
    }
    if (!this._state) {
      throw new Error("State is required");
    }
    if (!this._zipCode) {
      throw new Error("ZipCode is required");
    }
  }
}