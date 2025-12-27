import joi from ('joi');

const id = joi.number().integer();
const customerId = joi.number().integer();
const orderId = joi.number().integer();
const productId = joi.number().integer();
const amount = joi.number().integer().min(1);

const getOrderSchema = joi.object({
  id: id.required(),
});

const addItemSchema = joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

const createOrderSchema = joi.object({});

module.exports = { getOrderSchema, createOrderSchema, addItemSchema };
