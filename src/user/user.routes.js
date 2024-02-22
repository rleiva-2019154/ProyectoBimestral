import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'
import {test, registerClient, registerAdmin, login, update, deleteUser} from './user.controller.js'

const api = express.Router()

api.get('/test', /*[validateJwt, isAdmin],*/ test)
api.post('/registerClient', registerClient)
api.post('/login', login)
api.put('/update/:id', [validateJwt], update) //Middleware -> Funciones intermedias que sirven para validar


//api.put('/registerAdmin/:id', [validateJwt, isAdmin], registerAdmin)

api.delete('/delete/:id', [validateJwt], deleteUser)

export default api