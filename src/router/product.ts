import { Router } from 'express';
import AsyncHandle from '../middleware/async';
import productController from '../controller/productController';
import uploader from '../middleware/uploader';
import validateReq from '../validates/product';
var cpUpload = uploader.fields([
    { name: 'image01', maxCount: 1 },
    { name: 'image02', maxCount: 1 },
    { name: 'image03', maxCount: 1 }
  ]);
  
require('dotenv').config();
export default class ProductRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', AsyncHandle(productController.get));
        this.router.get('/:id', AsyncHandle(productController.getOne));
        this.router.post('/add', cpUpload, validateReq, AsyncHandle(productController.post));
        this.router.put('/edit/:id', cpUpload, validateReq, AsyncHandle(productController.put));
        this.router.delete('/delete/:id', AsyncHandle(productController.delete));
    }
}