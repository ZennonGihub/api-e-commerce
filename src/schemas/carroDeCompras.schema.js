import joi from ('joi');

const cartId = joi.string();
const userId = joi.string().alphanum().min(3).max(10).required();
const amount = joi.number().integer().min(1).required();
const productId = joi.number().integer().required();
const cartItemId = joi.number().integer().required();

export const addItemSchema = joi.object({
  userId: userId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

export const deleteItemCarro = joi.object({
  userId: userId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

export const updateItemSchema = joi.object({
  cartItemId: cartItemId.required(),
  amount: amount.required(),
  productId: productId.required(),
});
