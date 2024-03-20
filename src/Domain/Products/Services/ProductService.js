const ProductRepository = require('../Repositories/ProductRepository');
const instanceRepository = new ProductRepository();

class ProductService {
  async index(res, per_page, userId) {
    return await instanceRepository.index(res, per_page, userId);
  }

  async show(res, productId, userId) {
    return await instanceRepository.show(res, productId, userId);
  }

  async store(res, userId, data) {
    const { name, price, quantity } = data;

    return await instanceRepository.store(res, userId, { name, price, quantity });
  }

  async update(res, productId, userId, data) {
    const { name, price, quantity } = data;

    return await instanceRepository.update(res, productId, userId, { name, price, quantity });
  }

  async delete(res, productId, userId) {
    return await instanceRepository.delete(res, productId, userId);
  }
}

module.exports = ProductService;
