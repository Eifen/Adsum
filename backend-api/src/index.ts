//Global import
import express from 'express';
import * as dotenv from 'dotenv'
import userRouter from './routes/user.routes';
import categorieRouter from './routes/categories.routes';
import cors from 'cors'

//Local import

//Config Everioment
dotenv.config()

function bootstrap() {
    //Listen PORT
    const api = express();
    const PORT = process.env.PORT || 3000

    api.use(cors())
    api.use(express.json())
    api.use('/api/users', userRouter)
    api.use('/api/categories', categorieRouter)
    api.listen(PORT, () => { console.log(`API is started on PORT: ${PORT}`); })
}

bootstrap()