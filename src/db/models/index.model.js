import { Role, RoleSchema } from './role.model.js';
import { User, UserSchema } from './user.model.js';
import { Auth, AuthSchema } from './auth.model.js';
import { AuthHistory, AuthHistorySchema } from './authHistory.model.js';
import { Customer, CustomerSchema } from './customers.model.js';

import { Region, RegionSchema } from './region.model.js';
import { City, CitySchema } from './city.model.js';
import { Address, AddressSchema } from './address.model.js';

import { Category, CategorySchema } from './category.model.js';
import { ProductStatus, ProductStatusSchema } from './productStatus.model.js';
import { Product, ProductSchema } from './products.model.js';

import { Cart, CartSchema } from './cart.model.js';
import { CartItem, CartItemSchema } from './cartItem.model.js';

import { OrderStatus, OrderStatusSchema } from './orderStatus.model.js';
import { Order, OrderSchema } from './order.model.js';
import { OrderItem, OrderItemSchema } from './orderItem.model.js';
import { OrderTracking, OrderTrackingSchema } from './orderTracking.model.js';

import { PaymentMethod, PaymentMethodSchema } from './paymentMethod.model.js';
import { Payment, PaymentSchema } from './payment.model.js';

function setupModels(sequelize) {
  Role.init(RoleSchema, Role.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Auth.init(AuthSchema, Auth.config(sequelize));
  AuthHistory.init(AuthHistorySchema, AuthHistory.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Region.init(RegionSchema, Region.config(sequelize));
  City.init(CitySchema, City.config(sequelize));
  Address.init(AddressSchema, Address.config(sequelize));

  Category.init(CategorySchema, Category.config(sequelize));
  ProductStatus.init(ProductStatusSchema, ProductStatus.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  Cart.init(CartSchema, Cart.config(sequelize));
  CartItem.init(CartItemSchema, CartItem.config(sequelize));

  OrderStatus.init(OrderStatusSchema, OrderStatus.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderItem.init(OrderItemSchema, OrderItem.config(sequelize));
  OrderTracking.init(OrderTrackingSchema, OrderTracking.config(sequelize));

  PaymentMethod.init(PaymentMethodSchema, PaymentMethod.config(sequelize));
  Payment.init(PaymentSchema, Payment.config(sequelize));

  Role.associate(sequelize.models);
  User.associate(sequelize.models);
  Auth.associate(sequelize.models);
  AuthHistory.associate(sequelize.models);
  Customer.associate(sequelize.models);

  Region.associate(sequelize.models);
  City.associate(sequelize.models);
  Address.associate(sequelize.models);

  Category.associate(sequelize.models);
  ProductStatus.associate(sequelize.models);
  Product.associate(sequelize.models);

  Cart.associate(sequelize.models);
  CartItem.associate(sequelize.models);

  OrderStatus.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderItem.associate(sequelize.models);
  OrderTracking.associate(sequelize.models);

  PaymentMethod.associate(sequelize.models);
  Payment.associate(sequelize.models);
}

export default setupModels;
