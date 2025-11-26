import * as dotenv from "dotenv";
dotenv.config();
import path from 'path';

export const CONFIG = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV,
    DB_CONNECTION_STRING: process.env.DB_STRING,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : 10,
    jwt: {
        secret: process.env.JWT_SECRET || '8cdcc750c9ha53ese88322a3e116ae65fadc55bf',
        options: {
            // audience: 'https://example.io',
            expiresIn: '1d',
            // issuer: 'example.io'
        },
        cookie: {
            httpOnly: true,
            sameSite: true,
            signed: true,
            secure: true
        }
    },
    uploadsFolderPath: path.resolve(__dirname, '../../uploads'),
    cacheFolderPath: path.resolve(__dirname, "../../.cache"),
}