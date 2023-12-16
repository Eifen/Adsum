import { Request, Response, Router } from 'express'
import CategoriesController from '../controllers/categories.controller'

//Config categorie router
const categorieRouter = Router()

categorieRouter.post('/create', (req: Request, res: Response) => {
    CategoriesController.createCategorie(req.body)
        .then(response => res.status(200).send(response))
        .catch(error => {
            console.error(error)
            res.status(400).send({ response: false, message: 'Bad Request' })
        })
})

categorieRouter.get('/get', (req: Request, res: Response) => {
    CategoriesController.categories()
        .then(response => res.status(200).send(response))
        .catch(error => {
            console.error(error)
            res.status(400).send({ response: false, message: 'Bad Request' })
        })
})

categorieRouter.get('/get/:id', (req: Request, res: Response) => {
    CategoriesController.categories(parseInt(req.params.id))
        .then(response => res.status(200).send(response))
        .catch(error => {
            console.error(error)
            res.status(400).send({ response: false, message: 'Bad Request' })
        })
})

export default categorieRouter