import mysql from 'mysql';
import * as dotenv from 'dotenv';

dotenv.config();

export class Database {
    protected connection: mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: process.env["DATABASE_HOST"],
            user: process.env["DATABASE_USER"],
            password: process.env["DATABASE_PASSWORD"],
            database: process.env["DATABASE_NAME"],
            port: parseInt(process.env["DATABASE_PORT"] as string)
        })

        this.connection.connect(failure => { if (failure) console.error('Database is not connected') })
    }

    startConnection() {
        this.connection.resume()
    }

    endConnection() {
        this.connection.pause()
    }

    destroyConnection() {
        this.connection.end()
    }
}