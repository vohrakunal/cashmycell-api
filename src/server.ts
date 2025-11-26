import express from 'express';
import Middleware from './config/middleware';
import Routes from './routes/index.router';
import ErrorHandler from './helpers/error.handler';
import { DB } from './config/DB';

export class Server {
    public app: express.Application;
    isDbConnected: boolean;
    constructor() {
        this.app = express();
        this.isDbConnected = false;

        // DB connection
        DB.connect(this);
        // Initializing app middlewares
        Middleware.init(this);

        // Intializing Routes
        Routes.init(this);

        // Error handling
        ErrorHandler.init(this);

    }
}
