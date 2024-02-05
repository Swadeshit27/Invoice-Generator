import express from 'express';
import { addProduct, allProducts } from '../controllers/products.controller';
import { generateInvoice } from '../controllers/generate.controller';

const router = express.Router();

router.route('/').get(allProducts);
router.route('/add').post( addProduct);
router.route('/generate').post(generateInvoice);


export default router;