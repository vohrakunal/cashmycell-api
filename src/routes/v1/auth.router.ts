import { Router } from "express";
import { AuthController } from "../../controllers/Auth/auth.controller";

export default class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.post('/admin/login', AuthController.loginAdmin);
    }
}