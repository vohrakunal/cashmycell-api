import { Router } from "express";

export default class V1Router {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
    }
}