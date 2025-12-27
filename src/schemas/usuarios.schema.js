import joi from 'joi';

const id = joi.number().integer();
const name = joi.string().alphanum().min(3).max(10);
const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const email = joi
  .string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const role = joi.string().min(5);

export const createUser = joi.object({
  name: name.required(),
  password: password.required(),
  email: email.required(),
  role: role.required(),
});

export const updateUser = joi.object({
  name: name,
  password: password,
  email: email,
});

export const getUser = joi.object({
  name: name,
  email: email,
  role: role,
});

export const deleteUser = joi.object({
  id: id.required(),
  name: name,
  password: password,
  email: email,
  role: role,
});
