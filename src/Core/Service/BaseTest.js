const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserModel = require('../../Domain/Users/Models/UserModel.js');
const ProductModel = require('../../Domain/Products/Models/ProductModel.js');
const InvoiceModel = require('../../Domain/Invoices/Models/InvoiceModel.js');

const userModelInstance = new UserModel();
const productModelInstance = new ProductModel();
const invoiceModelInstance = new InvoiceModel();

class BaseTest {
  async user(userData) {
    const userModel = await userModelInstance.model();

    const apiToken = uuid.v4();
    userData.api_token = apiToken
    userData.password = await bcrypt.hash(userData.password, 10);

    const newUser = await new userModel(userData);

    return await newUser.save();
  }

  async product(productData) {
    const productModel = await productModelInstance.model();

    const newProduct = await new productModel(productData);

    return await newProduct.save();
  }

  async invoice(invoiceData) {
    const invoiceModel = await invoiceModelInstance.model();

    const newInvoice = await new invoiceModel(invoiceData);

    return await newInvoice.save();
  }
}

module.exports = BaseTest
