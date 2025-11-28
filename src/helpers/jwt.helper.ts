import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { CONFIG } from '../config/environment';


export class Utility {
    static comparePasswordHash(hash: string, plainText: string) {
        return bcryptjs.compareSync(plainText, hash);
    }


    static createPasswordHash(password: string) {
        let salt = bcryptjs.genSaltSync(CONFIG.BCRYPT_SALT_ROUNDS);
        return bcryptjs.hashSync(password, salt);
    }

    // Generate JWT token
    static generateJwtToken(userUUID: string) {
        return jwt.sign({
            _id: userUUID
        },
            CONFIG.jwt.secret,
            { expiresIn: CONFIG.jwt.options.expiresIn as StringValue | number }
        );
    }

    static createApiKeyHash(apiKey: any) {
        const hash = crypto.createHash('sha256').update(apiKey).digest('base64');
        return hash;
    }

    static generateUUID() {
        let uuid = uuidv4();
        return uuid
    }

    static numericString(num: number) {
        let result = '';
        let characters = '0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;

    }

    static async createRandamAlphanumericString(n: number) {
        const string = Utility.numericString(n);
        return string;
    }



    static async writeToFile(dataUri: string) {
        const string = dataUri;
        const regex = /^data:.+\/(.+);base64,(.*)$/;

        const matches: any = string.match(regex);
        const ext = matches[1];
        const data = matches[2];
        const buffer = Buffer.from(data, 'base64');
        const randomString = await Utility.createRandamAlphanumericString(6)
        const finalPath = CONFIG.cacheFolderPath + '/' + randomString + "." + ext
        fs.writeFileSync(finalPath, buffer);
        return finalPath
    }

    static randomIntFromInterval(min: number, max: number) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}
