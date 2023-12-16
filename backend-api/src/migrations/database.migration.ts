import * as dotenv from 'dotenv';
import mysql from 'mysql';
import { Database } from '../models/database.model';

dotenv.config();

export class DatabaseConfig extends Database {
    private sql_init = `DROP DATABASE IF EXISTS ${process.env["DATABASE_NAME"]};`;
    private create_database = `CREATE DATABASE ${process.env["DATABASE_NAME"]} COLLATE utf8mb4_general_ci;`;

    constructor() {
        super();
        this.connection = mysql.createConnection({
            host: process.env["DATABASE_HOST"],
            user: process.env["DATABASE_USER"],
            password: process.env["DATABASE_PASSWORD"],
            port: parseInt(process.env["DATABASE_PORT"] as string)
        })
    }

    init() {
        try {
            if (typeof this.connection === undefined) throw 'Connection config is ' + typeof this.connection;
            this.connection.query(this.sql_init)
            this.connection.query(this.create_database, function (error, results, fields) {
                if (error) throw error;
                console.log('Database created');
            })
            //Init table;
            this.initTable()
            this.seeds()
        } catch (error) {
            console.error(error)
        } finally {
            this.destroyConnection();
        }
    }

    private initTable() {
        this.connection.query(`USE ${process.env["DATABASE_NAME"]}`)
        this.connection.query('CREATE TABLE categories(category_id int PRIMARY KEY AUTO_INCREMENT, category_name varchar(255))', function (error, results, fields) {
            if (error) throw error;
            console.log('categories table has been created');
        })
        this.connection.query('CREATE TABLE users_contact(user_id int PRIMARY KEY AUTO_INCREMENT, name varchar(255), company_name varchar(255), email varchar(255), phone varchar(255), category_id int, message varchar(255), FOREIGN KEY (category_id) REFERENCES categories (category_id));',
            function (error) {
                if (error) throw error
                console.log('Users_contact table has been created')
            })
    }

    private seeds() {
        this.connection.query(`USE ${process.env["DATABASE_NAME"]}`)
        this.connection.query('INSERT INTO categories(category_name) VALUES ("Facturación"), ("Soporte técnico"), ("Ventas"), ("Informaciòn general")',
            function (error) {
                if (error) throw error
                console.log('Categories seed is completed')
                process.exit()
            });

    }
}