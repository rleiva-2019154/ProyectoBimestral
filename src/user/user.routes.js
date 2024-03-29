import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'
import {test, registerClient, registerAdminCliente, login, update, updatePassword, deleteUser, /*editUserInfo*/} from './user.controller.js'

const api = express.Router()

api.get('/test', /*[validateJwt, isAdmin],*/ test)
api.post('/registerClient', registerClient)
api.post('/registerAdminCliente', registerAdminCliente)
api.post('/login', login)
api.put('/update/:id', /*[validateJwt],*/ update) //Middleware -> Funciones intermedias que sirven para validar
api.put('/updatePassword/:id', updatePassword)
//api.put('/editUserInfo/:id'/*, [validateJwt, isAdmin]*/, editUserInfo)


api.delete('/delete/:id', /*[validateJwt],*/ deleteUser)

export default api