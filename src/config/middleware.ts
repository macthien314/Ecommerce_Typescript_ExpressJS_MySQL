import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileupload from 'express-fileupload'

import { IServer } from '../interfaces/serverInterfaces'

export default class Middleware {
    static init(server : IServer) : void {
        server.app.use(bodyParser.urlencoded({ extended: false }));
        server.app.use(bodyParser.json());
        server.app.use(cookieParser());
        server.app.use(helmet());
        server.app.use(cors());

        server.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,' +
                ' Content-Type, Accept,' +
                ' Authorization,' +
                ' Access-Control-Allow-Credentials'
            );
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
}