import express from 'express';
import { throwError } from '../helpers/response';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/environment';
import { AdminDao } from '../lib/dao/admin.dao';

export function adminAuthMiddleware() {
    return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (!req.headers.authorization) {
                return throwError("Invalid token", 400);

            }

            const decoded = jwt.verify(req.headers.authorization, CONFIG.jwt.secret) as any;

            // For Admin
            const admin = await AdminDao.getAdminBy_id(decoded['_id']);
            if (!admin) {
                return throwError("You are not authorized", 400);
            }

            if(admin.allowed == false){
                return throwError("Blocked User", 400);
            }
            req.admin = admin;
            req.isPublic = false;

            next();

        } catch (error) {
            next(error);
        }
    }
}