import { ProductsService } from '../services/articulos.service.js';
const service = new ProductsService();

export const getListProduct = async (req, res, next) => {
  try {
    const productos = await service.find(req.query);
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

export const getOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deletedProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
};
