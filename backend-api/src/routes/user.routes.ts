import { Request, Response, Router } from "express";
import UsersController from "../controllers/users.controller";

//Config userRouter
const userRouter = Router()

//Select all
userRouter.get('/get', (req: Request, res: Response) => {
    UsersController.usersInfo()
        .then(response => res.status(200).send(response))
        .catch(error => {
            console.error(error)
            res.status(400).send('Bad Request')
        })
})

//Select One
userRouter.get('/get/:id', (req: Request, res: Response) => {
    UsersController.usersInfo(parseInt(req.params.id))
        .then(response => res.status(200).send(response))
        .catch(error => {
            console.error(error)
            res.status(400).send('Bad Request')
        })
})

//Create
userRouter.post('/register', (req: Request, res: Response) => {
    UsersController.createUsers(req.body)
        .then(response => res.status(200).send(response))
        .catch(error => {
            console.error(error)
            res.status(400).send('Bad Request')
        })
})
export default userRouter

