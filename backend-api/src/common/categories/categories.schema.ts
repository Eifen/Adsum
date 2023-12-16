import Ajv, { JSONSchemaType } from "ajv";
import { ICategories, ICreateCategorie, IUpdateCategorie } from "./categories.interface";
const ajv = new Ajv()

const userSchema: JSONSchemaType<ICategories> = {
    type: "object",
    properties: {
        category_id: { type: "integer" },
        category_name: { type: 'string' }
    },
    required: ['category_id', 'category_name']
}

const createUserSchema: JSONSchemaType<ICreateCategorie> = {
    type: "object",
    properties: {
        category_id: { type: "integer" },
        category_name: { type: 'string' }
    },
    required: ['category_name']
}

const updateUserSchema: JSONSchemaType<IUpdateCategorie> = { type: 'object' }

//Exports
const categorieValidate = {
    select: ajv.compile(userSchema),
    create: ajv.compile(createUserSchema),
    update: ajv.compile(updateUserSchema)
}

export default categorieValidate