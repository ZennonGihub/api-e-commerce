import joi from ('joi');

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

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId
});

const getProductSchema = joi.object({
  id: id.required(),
});

const queryProductSchema = joi.object({
  limit,
  offset,
  price,
  priceMin,
  priceMax: joi.when('priceMin', {
    is: joi.number().integer(),
    then: joi.required()
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
