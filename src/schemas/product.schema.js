import joi from 'joi';

const id = joi.number().integer();
const name = joi.string().min(3).max(15);
const price = joi.number().integer();
const priceMin = joi.number().integer();
const priceMax = joi.number().integer();
const description = joi.string().min(10);
const image = joi.string().uri();
const categoryId = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();

export const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

export const updateProductSchema = joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId,
});

export const getProductSchema = joi.object({
  id: id.required(),
});

export const queryProductSchema = joi.object({
  limit,
  offset,
  price,
  priceMin,
  priceMax: joi.when('priceMin', {
    is: joi.number().integer(),
    then: joi.required(),
  }),
});
