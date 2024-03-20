const service = require('../Services/InvoiceService.js');

const instanceInvoiceService = new service();

class InvoiceController {
  async index(req, res) {
    const userId = req.user;
    const { per_page } = req.body;

    return await instanceInvoiceService.index(res, per_page, userId);
  }

  async show(req, res) {
    const userId = req.user;
    const invoiceId = req.params._id;

    return await instanceInvoiceService.show(res, invoiceId, userId);
  }

  async store(req, res) {
    const userId = req.user;
    const data = req.body

    return await instanceInvoiceService.store(res, userId, data);
  }

  async update(req, res) {
    const userId = req.user;
    const invoiceId = req.params._id;
    const { payment_status, products } = req.body;

    return await instanceInvoiceService.update(res, invoiceId, userId, { payment_status, products });
  }

  async delete(req, res) {
    const userId = req.user;
    const invoiceId = req.params._id;

    return await instanceInvoiceService.delete(res, invoiceId, userId);
  }
}

module.exports = InvoiceController;
