const InvoiceRepository = require('../Repositories/InvoiceRepository');
const instanceRepository = new InvoiceRepository();

class InvoiceService {
  async index(res, per_page, userId) {
    return await instanceRepository.index(res, per_page, userId);
  }

  async show(res, invoiceId, userId) {
    return await instanceRepository.show(res, invoiceId, userId);
  }

  async store(res, userId, data) {
    return await instanceRepository.store(res, userId, data);
  }

  async update(res, invoiceId, userId, data) {
    return await instanceRepository.update(res, invoiceId, userId, data);
  }

  async delete(res, invoiceId, userId) {
    return await instanceRepository.delete(res, invoiceId, userId);
  }
}

module.exports = InvoiceService;
