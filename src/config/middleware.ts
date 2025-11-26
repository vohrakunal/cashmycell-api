import cors from 'cors';
import morgan from 'morgan';
import express from 'express'
import * as path from 'path';
import { CONFIG } from './environment';
import { IServer } from '../interfaces/IServer';

export default class Middleware {
    static init(server: IServer): void {

        // express middleware
        server.app.use(express.urlencoded({ extended: false }));
        server.app.use(express.json());
        server.app.use(express.urlencoded({ limit: '50mb', extended: true }));
        server.app.use(morgan('dev'));

        server.app.use('/uploads', express.static(CONFIG.uploadsFolderPath));
        // mongoose.set('debug', true);

        // cors
        server.app.use(cors({
            origin: "*",
            credentials: true,
            methods: 'GET,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 200
        }));

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
            res.header('Access-Control-Allow-origin', req.headers.origin);
            next();
        });
    }
}
