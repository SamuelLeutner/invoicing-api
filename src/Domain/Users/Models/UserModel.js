const mongoose = require('mongoose');
const SetDatabase = require('../../../Core/Repositories/Database');

const mongo = new SetDatabase();

class UserModel {
  async userSchema() {
    return new mongoose.Schema({
      name: { type: mongoose.Schema.Types.String, required: true },
      email: { type: mongoose.Schema.Types.String, required: true },
      password: { type: mongoose.Schema.Types.String, required: true },
      products_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      invoices_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }],
      reset_password_token: { type: mongoose.Schema.Types.String },
      reset_password_expires: { type: mongoose.Schema.Types.Date },
      api_token: { type: mongoose.Schema.Types.String },
      created_at: { type: mongoose.Schema.Types.Date, default: Date.now },
      updated_at: { type: mongoose.Schema.Types.Date, default: Date.now },
    })
  }

  async model() {
    const userSchema = await this.userSchema();
    return mongo.database('User', userSchema);
  }
}

module.exports = UserModel;
