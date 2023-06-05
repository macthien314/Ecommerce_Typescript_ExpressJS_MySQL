import { Router } from 'express';
import AsyncHandle from '../middleware/async';
import categoryController from '../controller/categoryController';
import validateReq from '../validates/category';
require('dotenv').config();
export default class CategoryRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', AsyncHandle(categoryController.get));
        this.router.get('/:id', AsyncHandle(categoryController.getOne));
        this.router.post('/add', validateReq, AsyncHandle(categoryController.post));
        this.router.put('/edit/:id', validateReq, AsyncHandle(categoryController.put));
        this.router.delete('/delete/:id', AsyncHandle(categoryController.delete));
    }
}