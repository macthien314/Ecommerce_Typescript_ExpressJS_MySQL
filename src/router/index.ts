import express from 'express';
import { IServer } from '../interfaces/serverInterfaces';
import userRouter from './user';
import authRouter from './auth';
import categoryRouter from './category';
import productRouter from './product';

export default class Routes {
  static init(server: IServer): any {
    const router: express.Router = express.Router();

    // users
    server.app.use('/api/v1/users', new userRouter().router);

    // category
    server.app.use('/api/v1/category', new categoryRouter().router);
   
    // auth
    server.app.use('/api/v1/auth', new authRouter().router);

    // category
    server.app.use('/api/v1/products', new productRouter().router);
  }
}
