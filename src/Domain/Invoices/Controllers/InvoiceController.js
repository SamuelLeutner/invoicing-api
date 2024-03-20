const service = require('../Services/InvoiceService.js');

const instanceInvoiceService = new service();

class InvoiceController {
    async index(req, res) {
        const userId = req.user;
        const {per_page} = req.body;

        return await instanceInvoiceService.index(res, per_page, userId);
    }

    async show(req, res) {
        const userId = req.user;
        const invoiceId = req.params.id;

        return await instanceInvoiceService.show(res, invoiceId, userId);
    }

    async store(req, res) {
        const userId = req.user;
        const {client, products} = req.body

        return await instanceInvoiceService.store(res, userId, {client, products});
    }

    async update(req, res) {
        const userId = req.user;
        const invoiceId = req.params.id;
        const {client, products} = req.body

        return await instanceInvoiceService.update(res, invoiceId, userId, {client, products});
    }

    async updatePaymentStatus(req, res) {
        const userId = req.user;
        const invoiceId = req.params.id;
        const {payment_status} = req.body;

        return await instanceInvoiceService.updatePaymentStatus(res, invoiceId, userId, {payment_status});
    }

    async delete(req, res) {
        const userId = req.user;
        const invoiceId = req.params.id;

        return await instanceInvoiceService.delete(res, invoiceId, userId);
    }
}

module.exports = InvoiceController;
