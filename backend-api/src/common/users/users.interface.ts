//Users Interface

interface IUsers {
    readonly user_id: number,
    name: string,
    company_name: string,
    email: string,
    phone: string,
    category_id: number,
    message: string
}
interface ICreateUsers extends Omit<IUsers, 'user_id'> { }
interface IUpdateUser extends Partial<ICreateUsers> { }

type userParams = [string, string, string, string, number, string]

export { IUsers, ICreateUsers, IUpdateUser, userParams }