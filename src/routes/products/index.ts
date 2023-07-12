import { Router } from 'express';
import { getProducts } from '../../controllers/products/getproduct';

const productRouter = Router();

productRouter.get('/', getProducts);

export default productRouter;
