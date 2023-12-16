import { response } from "express"
import { ICategories, ICreateCategorie, categoriesParams } from "../common/categories/categories.interface"
import categorieValidate from "../common/categories/categories.schema"
import CategoriesModel from "../models/categories.model"

export default class CategoriesController {
    private static categorieModel = new CategoriesModel()

    static async createCategorie(categorieInfo: unknown) {
        try {
            this.categorieModel.startConnection()
            if (typeof categorieInfo !== 'object' || categorieInfo === null || !categorieValidate.create(categorieInfo)) throw new Error('Create data is invalid')
            const userDTO = categorieInfo as ICreateCategorie
            const prepareParams: categoriesParams = Object.values(userDTO) as categoriesParams
            //Create User
            const requestCategories = await this.categorieModel.create(prepareParams)
            return requestCategories
        } catch (error) {
            console.log(error)
            response.status(400).send({ response: false, message: 'Bad Request' })
        } finally {
            this.categorieModel.endConnection()
        }
    }

    static async categories(): Promise<ICategories[]>
    static async categories(categorieId: number): Promise<ICategories>

    static async categories(categorieId?: number): Promise<ICategories[] | ICategories | undefined> {
        try {
            this.categorieModel.startConnection()
            let requestCategories: ICategories[] | ICategories = []
            if (typeof categorieId === 'undefined') requestCategories = await this.categorieModel.getAll();
            if (typeof categorieId !== 'undefined') requestCategories = await this.categorieModel.getOne(categorieId);
            return requestCategories
        } catch (error) {
            console.log(error)
            response.status(400).send({ response: false, message: 'Bad Request' })
        } finally {
            this.categorieModel.endConnection()
        }
    }
}