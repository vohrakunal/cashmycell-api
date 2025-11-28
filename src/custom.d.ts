import { IAdmin } from "./models/admin.model";

declare global {
    namespace Express {
        export interface Request {
            admin: IAdmin
            isPublic: boolean
        }
    }
}