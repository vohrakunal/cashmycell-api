import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { IServer } from '../interfaces/IServer';
import { CONFIG } from './environment';

dotenv.config();

const connectOptions: mongoose.ConnectOptions = {
    // Modern Mongoose (v6+) handles parser and topology by default
    // The below options are safe and recommended for production setups
    autoIndex: false, // Don't build indexes automatically in production
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Timeout after 5s if no server found
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    // readPreference: 'secondaryPreferred'
};

export class DB {
    static async connect(server?: IServer) {
        try {
            console.log('Connecting to DB...');
            await mongoose.connect(CONFIG.DB_CONNECTION_STRING!, connectOptions);
            
            if (server) {
                server.isDbConnected = true;
            }

            console.log('Connected to DB successfully');
        } catch (error) {
            console.error('DB Connection Error:', error);
            throw error;
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('Disconnected from DB successfully');
        } catch (error) {
            console.error('DB Disconnection Error:', error);
            throw error;
        }
    }
}
