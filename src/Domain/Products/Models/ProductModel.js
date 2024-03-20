const mongoose = require('mongoose');
const SetDatabase = require("../../../Core/Repositories/Database");
const mongo = new SetDatabase();

class ProductModel {
  async productSchema() {
    return new mongoose.Schema({
      name: { type: mongoose.Schema.Types.String, required: true },
      price: { type: mongoose.Schema.Types.Number, required: true },
      quantity: { type: mongoose.Schema.Types.Number, required: true },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      created_at: { type: mongoose.Schema.Types.Date, default: Date.now },
      updated_at: { type: mongoose.Schema.Types.Date, default: Date.now },
    })
  }

  async model() {
    const productSchema = await this.productSchema();
    return mongo.database('Product', productSchema);
  }
}

module.exports = ProductModel;
