const service = require('../Services/ProductService.js');

const instanceProductService = new service();

class ProductController {
  async index(req, res) {
    const userId = req.user;
    const { per_page } = req.body;

    return await instanceProductService.index(res, per_page, userId);
  }

  async show(req, res) {
    const userId = req.user;
    const productId = req.params._id;

    return await instanceProductService.show(res, productId, userId);
  }

  async store(req, res) {
    const userId = req.user;
    const { name, price, quantity } = req.body;

    return await instanceProductService.store(res, userId, { name, price, quantity });
  }

  async update(req, res) {
    const userId = req.user;
    const productId = req.params._id;
    const { name, price, quantity } = req.body

    return await instanceProductService.update(res, productId, userId, { name, price, quantity });
  }

  async delete(req, res) {
    const userId = req.user;
    const productId = req.params._id;

    return await instanceProductService.delete(res, productId, userId);
  }
}

module.exports = ProductController;
