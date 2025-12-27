import express from 'express';
import { CategoryService } from '../services/categorias.service.js';

const router = express.Router();
const service = new CategoryService();

export const getListCategories = async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getOneCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryId = await service.findOne(id);
    res.json(categoryId);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const updatedCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const removedCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json(id);
  } catch (error) {
    next(error);
  }
};
