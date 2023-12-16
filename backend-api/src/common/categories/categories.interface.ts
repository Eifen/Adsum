interface ICategories {
    readonly category_id: number,
    category_name: string
}

type ICreateCategorie = Omit<ICategories, 'category_id'>;
type IUpdateCategorie = Partial<ICategories>;
type categoriesParams = [string]

export { ICategories, ICreateCategorie, IUpdateCategorie, categoriesParams }
