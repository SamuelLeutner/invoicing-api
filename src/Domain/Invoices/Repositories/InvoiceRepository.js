const InvoiceModel = require('../Models/InvoiceModel.js');
const BaseRepository = require('../../../Core/Repositories/BaseRepository.js');

class InvoiceRepository extends BaseRepository {
    constructor() {
        const model = new InvoiceModel();
        super(model);
    }

    async updatePaymentStatus(res, invoiceId, userId, data) {
        const {payment_status} = data;

        return await this.model.findOneAndUpdate({_id: invoiceId, user_id: userId}, {payment_status}, {new: true}, (err, doc) => {
            if (err) {
                return res.status(400).json({error: 'Invoice not found'});
            }

            return res.status(200).json(doc);
        });
    }
}

module.exports = InvoiceRepository;
