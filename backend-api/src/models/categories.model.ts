import { ICategories, categoriesParams } from "../common/categories/categories.interface";
import categorieValidate from "../common/categories/categories.schema";
import { responseBody } from "../common/global.interface";
import { Database } from "./database.model";

export default class CategoriesModel extends Database {
    private table: string = 'categories'

    getAll(): Promise<ICategories[]> {
        const response = new Promise<ICategories[]>((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.table}`, function (error, results) {
                //Error
                if (error) reject(error);
                if (results.length === 0) reject(new Error('Categories table is empty'));
                if (!categorieValidate.select(results[0])) reject(new Error('Target table is not categories'));
                //Success
                resolve(results as ICategories[])
            })
        })
        return response
    }

    getOne(categorieId: number): Promise<ICategories> {
        const response = new Promise<ICategories>((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.table} WHERE category_id = ? LIMIT 1`, [categorieId], function (error, results) {
                //Error
                if (error) reject(error);
                if ((results as Array<any>).length === 0) reject(new Error('Categories table is empty'));
                if (!categorieValidate.select(results[0])) reject(new Error('Target table is not categories'));
                //Success
                resolve(results[0] as ICategories)
            })
        })
        return response
    }


    create(categoryParams: categoriesParams): Promise<responseBody> {
        const response = new Promise<responseBody>((resolve, reject) => {
            this.connection.query(
                `INSERT INTO ${this.table} (category_name) VALUES (?)`,
                categoryParams,
                function (error) {
                    if (error) reject(error);
                    resolve({ response: true, message: 'Categorie has been registered sucessfully' })
                }
            )
        })

        return response
    }
}