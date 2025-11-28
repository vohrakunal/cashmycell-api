import express from 'express';
import { AdminService } from '../../services/admin.service';
import { Utility } from '../../helpers/jwt.helper';

export class AuthController {
    static async loginAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            // Login logic here
            const { email, password } = req.body;

            const admin = await AdminService.getAdminByEmail(email);
            if (!admin) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const isPasswordValid = Utility.comparePasswordHash(admin.password, password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            if (admin.allowed == false) {
                return res.status(403).json({ message: "Blocked User" });
            }

            const token = Utility.generateJwtToken(String(admin._id));
            const responseData = {
                admin: {
                    name: admin.name,
                    pages: admin.pages,
                    email: admin.email,
                    allowed: admin.allowed
                },
                token: token
            };
            return res.status(200).json({ message: "Login successful", data: responseData });
        } catch (error) {
            next(error);
        }
    }
}