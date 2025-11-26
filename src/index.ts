import http from 'http';
import fs from 'fs';
import path from 'path';
import { Server } from './server';
import { normalizePort, onError } from './serverHandler';
import { CONFIG } from './config/environment';

const SERVER = new Server();

const PORT = normalizePort(CONFIG.PORT);

SERVER.app.set('port', PORT);

let server = http.createServer(SERVER.app);

server.listen(PORT);

// server handlers
server.on("error", error => onError(error, PORT));

server.on("listening", () => {
    const addr: any = server.address();
    const bind: string = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

    console.log(`Listening on ${bind}`);
});

// Create uploads folder if not exists
console.log(CONFIG.uploadsFolderPath, 'CONFIG.uploadsFolderPath');

if (!fs.existsSync(CONFIG.uploadsFolderPath)) {
    fs.mkdir(CONFIG.uploadsFolderPath, () => {
        console.log('Uploads folder created');
    });
} else {
    console.log('Uploads folders exists');
}

if (!fs.existsSync(CONFIG.cacheFolderPath)) {
    fs.mkdir(CONFIG.cacheFolderPath, () => {
        console.log('Cache folder created');
    });
} else {
    console.log('Cache folder exists');
}