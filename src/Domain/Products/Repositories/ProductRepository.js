const ProductModel = require('../Models/ProductModel.js');
const BaseRepository = require("../../../Core/Repositories/BaseRepository");

class ProductRepository extends BaseRepository {
  constructor() {
    const model = new ProductModel();
    super(model);
  }
}

module.exports = ProductRepository;
