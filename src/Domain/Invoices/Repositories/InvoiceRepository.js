const InvoiceModel = require('../Models/InvoiceModel.js');
const BaseRepository = require('../../../Core/Repositories/BaseRepository.js');

class InvoiceRepository extends BaseRepository {
  constructor() {
    const model = new InvoiceModel();
    super(model);
  }
}

module.exports = InvoiceRepository;
