const mongoose = require('mongoose');
const SetDatabase = require("../../../Core/Repositories/Database");
const mongo = new SetDatabase();

class InvoiceModel {
  async invoiceSchema() {
    return new mongoose.Schema({
      products: { type: mongoose.Schema.Types.Object, required: true },
      payment_status: { type: mongoose.Schema.Types.String, default: 'unpaid' },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      created_at: { type: mongoose.Schema.Types.Date, default: Date.now },
      updated_at: { type: mongoose.Schema.Types.Date, default: Date.now },
    })
  }

  async model() {
    const invoiceSchema = await this.invoiceSchema();
    return mongo.database('Invoice', invoiceSchema);
  }
}

module.exports = InvoiceModel;
