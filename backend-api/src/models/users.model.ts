import { IUsers, userParams } from "../common/users/users.interface";
import { Database } from "./database.model";
import userValidate from "../common/users/users.schema";
import { responseBody } from "../common/global.interface";

export default class UsersModel extends Database {
    private table: string = 'users_contact';

    getAll(): Promise<IUsers[]> {
        const response = new Promise<IUsers[]>((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.table}`, function (error, results) {
                //Error
                if (error) reject(error);
                if ((results as Array<any>).length === 0) reject(new Error('Users table is empty'));
                if (!userValidate.select(results[0])) reject(new Error('Target table is not users'));
                //Success
                resolve(results as IUsers[])
            })
        })
        return response
    }

    getOne(userId: number): Promise<IUsers> {
        const response = new Promise<IUsers>((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.table} WHERE user_id = ? LIMIT 1`, [userId], function (error, results) {
                //Error
                if (error) reject(error);
                if ((results as Array<any>).length === 0) reject(new Error('Users table is empty'));
                if (!userValidate.select(results[0])) reject(new Error('Target table is not users'));
                //Success
                resolve(results[0] as IUsers)
            })
        })
        return response
    }

    create(userParams: userParams): Promise<responseBody> {
        const response = new Promise<responseBody>((resolve, reject) => {
            this.connection.query(
                `INSERT INTO ${this.table} (name, company_name, email, phone, category_id, message) VALUES (?,?,?,?,?,?)`
                , userParams
                , function (error) {
                    if (error) reject(error)
                    resolve({ response: true, message: 'User has been registered sucessfully' })
                }
            )
        })

        return response
    }
}