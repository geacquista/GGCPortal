import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Role {
  GGC = "GGC",
  FARM = "FARM"
}

export enum OrderStatus {
  PLACED = "PLACED",
  PROCESSED = "PROCESSED",
  SHIPPED = "SHIPPED",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED"
}



type UsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderLineMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type InvoiceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShippingAddressMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CustomerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Users {
  readonly id: string;
  readonly email: string;
  readonly role: Role | keyof typeof Role;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Users, UsersMetaData>);
  static copyOf(source: Users, mutator: (draft: MutableModel<Users, UsersMetaData>) => MutableModel<Users, UsersMetaData> | void): Users;
}

export declare class Product {
  readonly id: string;
  readonly name: string;
  readonly productDescription: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

export declare class OrderLine {
  readonly id: string;
  readonly orderID: string;
  readonly product?: Product;
  readonly qtyOrdered: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly orderLineProductId?: string;
  constructor(init: ModelInit<OrderLine, OrderLineMetaData>);
  static copyOf(source: OrderLine, mutator: (draft: MutableModel<OrderLine, OrderLineMetaData>) => MutableModel<OrderLine, OrderLineMetaData> | void): OrderLine;
}

export declare class Invoice {
  readonly id: string;
  readonly invoiceNumber: string;
  readonly revenue: number;
  readonly expense: number;
  readonly isPaid: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Invoice, InvoiceMetaData>);
  static copyOf(source: Invoice, mutator: (draft: MutableModel<Invoice, InvoiceMetaData>) => MutableModel<Invoice, InvoiceMetaData> | void): Invoice;
}

export declare class ShippingAddress {
  readonly id: string;
  readonly streetAddress: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ShippingAddress, ShippingAddressMetaData>);
  static copyOf(source: ShippingAddress, mutator: (draft: MutableModel<ShippingAddress, ShippingAddressMetaData>) => MutableModel<ShippingAddress, ShippingAddressMetaData> | void): ShippingAddress;
}

export declare class Customer {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phoneNumber?: string;
  readonly email: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Customer, CustomerMetaData>);
  static copyOf(source: Customer, mutator: (draft: MutableModel<Customer, CustomerMetaData>) => MutableModel<Customer, CustomerMetaData> | void): Customer;
}

export declare class Order {
  readonly id: string;
  readonly datePlaced: string;
  readonly isGift: boolean;
  readonly giftFor?: string;
  readonly giftMessage?: string;
  readonly shipmentTrackingNumber?: string;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly shippingAddress?: ShippingAddress;
  readonly customer?: Customer;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly orderShippingAddressId?: string;
  readonly orderCustomerId?: string;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}