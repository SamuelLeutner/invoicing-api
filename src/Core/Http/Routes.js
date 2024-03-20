const express = require('express');
const apiRouter = express.Router();

const { authenticate } = require("./Middleware");
const UserController = require("../../Domain/Users/Controllers/UserController");
const ProductController = require("../../Domain/Products/Controllers/ProductController");
const InvoiceController = require("../../Domain/Invoices/Controllers/InvoiceController");

const userController = new UserController();
const productController = new ProductController();
const invoiceController = new InvoiceController();

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: false }));

// Ping route
apiRouter.get('/ping', (req, res) => res.send({ status: `Server running on: ${process.env.SERVER_PORT} ✅` }));

// Users routes
apiRouter.post('/login', async (req, res) => await userController.login(req, res));
apiRouter.post('/register', async (req, res) => await userController.store(req, res));
apiRouter.post('/change-password', async (req, res) => await userController.sendChangePassword(req, res));
apiRouter.post('/change-password/temporary_token=:token', async (req, res) => await userController.changePassword(req, res));

// Product routes
const productRouter = express.Router();
productRouter.use(express.json());  // Ensure JSON parsing for product routes
productRouter.get('/', authenticate, async (req, res) => await productController.index(req, res));
productRouter.get('/:_id', authenticate, async (req, res) => await productController.show(req, res));
productRouter.post('/', authenticate, async (req, res) => await productController.store(req, res));
productRouter.put('/:_id', authenticate, async (req, res) => await productController.update(req, res));
productRouter.delete('/:_id', authenticate, async (req, res) => await productController.delete(req, res));

// Invoice routes
const invoiceRouter = express.Router();
invoiceRouter.use(express.json());  // Ensure JSON parsing for invoice routes
invoiceRouter.get('/', authenticate, async (req, res) => await invoiceController.index(req, res));
invoiceRouter.get('/:_id', authenticate, async (req, res) => await invoiceController.show(req, res));
invoiceRouter.post('/', authenticate, async (req, res) => await invoiceController.store(req, res));
invoiceRouter.put('/:_id', authenticate, async (req, res) => await invoiceController.update(req, res));
invoiceRouter.delete('/:_id', authenticate, async (req, res) => await invoiceController.delete(req, res));

// Use product and invoice routers
apiRouter.use('/product', productRouter);
apiRouter.use('/invoice', invoiceRouter);

module.exports = apiRouter;
