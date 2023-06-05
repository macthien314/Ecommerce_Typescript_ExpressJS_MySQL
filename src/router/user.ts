import { Router } from 'express';
import AsyncHandle from '../middleware/async';
// import { validator } from '../validates/category'
import userController from '../controller/userController';
import uploader from '../middleware/uploader';
import validateReq from '../validates/user';
const cpUpload = uploader.fields([{ name: 'image' }]);
require('dotenv').config();
export default class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', AsyncHandle(userController.get));
        this.router.get('/:id', AsyncHandle(userController.getOne));
        this.router.post('/add', cpUpload, validateReq, AsyncHandle(userController.addUser));
        this.router.put('/edit/:id', cpUpload, validateReq, AsyncHandle(userController.put));
        this.router.delete('/delete/:id', AsyncHandle(userController.delete));
    }
}