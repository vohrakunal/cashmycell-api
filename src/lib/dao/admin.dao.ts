import AdminModel from "../../models/Admin.model";

export class AdminDao{
    static async getAdminBy_id(_id: string){
        return await AdminModel.findById(_id).select('+password').exec();
    }

    static async getAdminByEmail(email: string){
        return await AdminModel.findOne({ email: email }).select('+password').exec();
    }
}