import { DB } from "../config/DB";
import { Utility } from "../helpers/jwt.helper";
import AdminModel, { all_pages_admin } from "../models/Admin.model";


async function main() {
    await DB.connect();
    let adminEmail = `super_admin_${Math.floor(1000 + Math.random() * 9000)}@cmc.com`;

    let plainPassword = Utility.numericString(8);
    let password = Utility.createPasswordHash(plainPassword);

    await AdminModel.create({
        name: 'Super Admin',
        email: adminEmail,
        password: password,
        allowed: true,
        pages: all_pages_admin
    });

    console.log('New Admin created');
    console.log('UserName: ', adminEmail);
    console.log('Password: ', plainPassword);
} 


main();
