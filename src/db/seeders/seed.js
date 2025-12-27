import { sequelize } from '../../libs/sequelize.js';
import { setupModels } from '../models/index.model.js';

async function seed() {
  try {
    setupModels(sequelize);

    await sequelize.authenticate();
    console.log('🔌 Conexión establecida.');

    await sequelize.sync({ force: false });

    const roles = [
      { id: 1, name: 'admin' },
      { id: 2, name: 'customer' },
    ];
    await sequelize.models.Role.bulkCreate(roles, { ignoreDuplicates: true });
    console.log('✅ Roles insertados');

    const regions = [
      { id: 1, name: 'Arica y Parinacota' },
      { id: 2, name: 'Tarapacá' },
      { id: 3, name: 'Antofagasta' },
      { id: 7, name: 'Metropolitana de Santiago' },
      { id: 13, name: 'Maule' },
    ];
    await sequelize.models.Region.bulkCreate(regions, {
      ignoreDuplicates: true,
    });
    console.log('✅ Regiones insertadas');

    const categories = [
      { name: 'Electrónica' },
      { name: 'Ropa' },
      { name: 'Hogar' },
      { name: 'Gamer' },
    ];
    await sequelize.models.Category.bulkCreate(categories, {
      ignoreDuplicates: true,
    });
    console.log('✅ Categorías insertadas');

    const productStatuses = [
      { id: 1, name: 'active' },
      { id: 2, name: 'out_of_stock' },
      { id: 3, name: 'archived' },
    ];
    await sequelize.models.ProductStatus.bulkCreate(productStatuses, {
      ignoreDuplicates: true,
    });
    console.log('✅ Estados de Producto insertados');

    const orderStatuses = [
      { id: 1, name: 'pending' },
      { id: 2, name: 'paid' },
      { id: 3, name: 'shipped' },
      { id: 4, name: 'delivered' },
      { id: 5, name: 'cancelled' },
    ];
    await sequelize.models.OrderStatus.bulkCreate(orderStatuses, {
      ignoreDuplicates: true,
    });
    console.log('✅ Estados de Orden insertados');

    const paymentMethods = [
      { name: 'WebPay Plus' },
      { name: 'Transferencia Bancaria' },
      { name: 'Efectivo' },
    ];
    await sequelize.models.PaymentMethod.bulkCreate(paymentMethods, {
      ignoreDuplicates: true,
    });
    console.log('✅ Métodos de Pago insertados');

    const cities = [
      { name: 'Linares', idRegion: 13 },
      { name: 'Talca', idRegion: 13 },
      { name: 'Santiago Centro', idRegion: 7 },
      { name: 'Providencia', idRegion: 7 },
    ];
    await sequelize.models.City.bulkCreate(cities, { ignoreDuplicates: true });
    console.log('✅ Ciudades insertadas');

    const [adminUser] = await sequelize.models.User.findOrCreate({
      where: { username: 'admin_tito' },
      defaults: {
        idRole: 1,
      },
    });

    await sequelize.models.Auth.findOrCreate({
      where: { email: 'admin@ecommerce.cl' },
      defaults: {
        idUser: adminUser.id,
        password: '123456_password_segura',
        phone: '+56912345678',
      },
    });
    console.log('✅ Usuario Admin de prueba creado');

    await sequelize.models.Product.findOrCreate({
      where: { name: 'PC Gamer Básico' },
      defaults: {
        price: 500000,
        stock: 10,
        imageUrl: 'https://placehold.co/600x400',
        idCategory: 4,
        idStatus: 1,
      },
    });
    console.log('✅ Producto de prueba creado');

    console.log('🚀 ¡SEED FINALIZADO CON ÉXITO!');
  } catch (error) {
    console.error('❌ Error en el seed:', error);
  } finally {
    await sequelize.close();
  }
}

seed();
