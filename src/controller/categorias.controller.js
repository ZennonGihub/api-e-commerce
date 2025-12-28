import { CategoryService } from '../services/categorias.service.js';

const service = new CategoryService();

export const getListCategories = async (req, res, next) => {
  try {
    const categories = await service.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getOneCategory = async (req, res, next) => {
  try {
    const categoryId = await service.findOne(req.params.id);
    res.status(200).json(categoryId);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const newCategory = await service.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const updatedCategory = async (req, res, next) => {
  try {
    const category = await service.update(req.params.id, req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const removedCategory = async (req, res, next) => {
  try {
    const result = await service.delete(req.params.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
