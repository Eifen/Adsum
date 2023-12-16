import Ajv, { JSONSchemaType } from "ajv";
import { ICreateUsers, IUpdateUser, IUsers } from "./users.interface";
const ajv = new Ajv()

const userSchema: JSONSchemaType<IUsers> = {
    type: "object",
    properties: {
        user_id: { type: "integer" },
        name: { type: 'string' },
        company_name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        category_id: { type: 'integer' },
        message: { type: 'string' }
    },
    required: ['user_id', 'name', 'company_name', 'email', 'phone', 'category_id', 'message']
}

const createUserSchema: JSONSchemaType<ICreateUsers> = {
    type: "object",
    properties: {
        name: { type: 'string' },
        company_name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        category_id: { type: 'integer' },
        message: { type: 'string' }
    },
    required: ['name', 'company_name', 'email', 'phone', 'category_id', 'message']
}

const updateUserSchema: JSONSchemaType<IUpdateUser> = { type: 'object' }

//Exports
const userValidate = {
    select: ajv.compile(userSchema),
    create: ajv.compile(createUserSchema),
    update: ajv.compile(updateUserSchema)
}

export default userValidate