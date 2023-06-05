import { Router } from 'express';
import AsyncHandle from '../middleware/async';
import authController from '../controller/authController';
import  validateReq  from '../validates/auth';
var {protect , authorize}   = require("../middleware/auth");

export default class AuthRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.post('/login', AsyncHandle(authController.login));
        this.router.post('/register',validateReq, AsyncHandle(authController.register));
        this.router.get('/logout', AsyncHandle(authController.logout));
        this.router.get('/me',protect, AsyncHandle(authController.me));
    }
}