import express from 'express';
import Middleware from './src/config/middleware';
import Routes from './src/router/index';
import ErrorHandler from './src/middleware/error';
// import {db} from './app/configs/connection';
// db;
class App {
    public app : express.Application;

    constructor() {
        this.app = express();
        Middleware.init(this);
        Routes.init(this);
        ErrorHandler.init(this);
    }
}

export default new App().app;