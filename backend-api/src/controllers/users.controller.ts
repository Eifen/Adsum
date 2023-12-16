import userValidate from "../common/users/users.schema"
import { ICreateUsers, IUsers, userParams } from "../common/users/users.interface"
import UsersModel from "../models/users.model"
import { response } from "express"

export default class UsersController {
    private static userModel = new UsersModel()

    static async createUsers(usersInfo: unknown) {
        try {
            this.userModel.startConnection()
            if (typeof usersInfo !== 'object' || usersInfo === null || !userValidate.create(usersInfo)) throw new Error('Create data is invalid')
            const userDTO = usersInfo as ICreateUsers
            const prepareParams: userParams = Object.values(userDTO) as userParams
            //Create User
            const requestUser = await this.userModel.create(prepareParams)
            return requestUser
        } catch (error) {
            console.log(error)
            response.status(400).send({ response: false, message: 'Bad Request' })
        } finally {
            this.userModel.endConnection()
        }
    }

    //Overload select users
    static async usersInfo(): Promise<IUsers[]>
    static async usersInfo(userId: number): Promise<IUsers>

    static async usersInfo(userId?: number): Promise<IUsers[] | IUsers | undefined> {
        try {
            this.userModel.startConnection()
            let requestUser: IUsers[] | IUsers = []
            if (typeof userId === 'undefined') requestUser = await this.userModel.getAll();
            if (typeof userId !== 'undefined') requestUser = await this.userModel.getOne(userId);
            //Return
            return requestUser
        } catch (error) {
            console.error(error)
            response.status(400).send({ response: false, message: 'Bad Request' })
        } finally {
            this.userModel.endConnection()
        }
    }
}