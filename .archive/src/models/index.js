// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Role = {
  "GGC": "GGC",
  "FARM": "FARM"
};

const OrderStatus = {
  "PLACED": "PLACED",
  "PROCESSED": "PROCESSED",
  "SHIPPED": "SHIPPED",
  "COMPLETED": "COMPLETED",
  "ARCHIVED": "ARCHIVED"
};

const { Users, Product, OrderLine, Invoice, ShippingAddress, Customer, Order } = initSchema(schema);

export {
  Users,
  Product,
  OrderLine,
  Invoice,
  ShippingAddress,
  Customer,
  Order,
  Role,
  OrderStatus
};