import { AdminDao } from "../lib/dao/admin.dao";

export class AdminService{
    static async getAdminByEmail(email: string){
        return await AdminDao.getAdminByEmail(email);
    }
}