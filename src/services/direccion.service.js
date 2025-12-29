import boom from '@hapi/boom';
import { models } from '../libs/sequelize.js';

export class AddressService {
  constructor() {}

  async create(userId, data) {
    // Validacion del cliente
    const customer = await models.Customer.findOne({
      where: { idUser: userId },
    });
    if (!customer) throw boom.badRequest('Debes tener un perfil de cliente');

    // Validacion que la ciudad si existe
    const city = await models.City.findByPk(data.idCity);
    if (!city) throw boom.badRequest('La ciudad seleccionada no es válida');

    const newAddress = await models.Address.create({
      street: data.street,
      number: data.number,
      idCity: data.idCity,
      idCustomer: customer.id,
    });

    return newAddress;
  }

  // Listar las direcciones del usuario
  async findByUser(userId) {
    const customer = await models.Customer.findOne({
      where: { idUser: userId },
    });
    if (!customer) return [];

    return await models.Address.findAll({
      where: { idCustomer: customer.id },
      include: [
        {
          association: 'city',
          include: ['region'],
        },
      ],
    });
  }

  // Eliminar
  async delete(id, userId) {
    const customer = await models.Customer.findOne({
      where: { idUser: userId },
    });
    const address = await models.Address.findOne({
      where: { id, idCustomer: customer.id },
    });
    if (!address) throw boom.notFound('Dirección no encontrada');
    await address.destroy();
    return { id };
  }
}
