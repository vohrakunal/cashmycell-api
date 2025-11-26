import express, { NextFunction, Request, Response } from 'express';
import { IServer } from '../interfaces/IServer';
import V1Router from './v1/v1.router';

export default class Routes {

    static init(server: IServer): void {
        const router: express.Router = express.Router();

        server.app.use('/', router);

        server.app.get('/healthCheck', async (req: Request, res: Response, next: NextFunction) => {
            const healthcheck: any = {
                dbConnect: server.isDbConnected,
                uptime: process.uptime(),
                message: 'OK',
                time: new Date().toLocaleString()
            };
            try {
                res.send(healthcheck);
            } catch (e) {
                healthcheck.message = e;
                res.status(503).send(healthcheck);
            }
        });

        // users
        server.app.use('/api/v1', new V1Router().router);
    }
}