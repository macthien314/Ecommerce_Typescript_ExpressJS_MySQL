import * as http from 'http';
import * as serverHandle from './serverHandle';
import app from '../app';
import logger from '../src/lib/logger'
const dotenv = require('dotenv')
dotenv.config();
const port: string | number | boolean = serverHandle.normalizePort(process.env.PORT || 3000);

app.set('port',port);

logger.http(`Server listening on port ${port}`);


const server: http.Server = http.createServer(app);

server.listen(port);

// server handlers
server.on(
    'error',
    (error) => serverHandle.onError(error, port));
server.on(
    'listening',
    serverHandle.onListening.bind(server));





