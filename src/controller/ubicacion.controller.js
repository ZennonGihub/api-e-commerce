import { LocationService } from '../services/ubicacion.service.js';
const service = new LocationService();

export const getRegions = async (req, res, next) => {
  try {
    const regions = await service.findAll();
    res.json(regions);
  } catch (error) {
    next(error);
  }
};

export const getCitiesByRegion = async (req, res, next) => {
  try {
    const cities = await service.findCitiesByRegion(req.params.id);
    res.json(cities);
  } catch (error) {
    next(error);
  }
};
