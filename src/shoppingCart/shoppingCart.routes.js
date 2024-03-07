import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'
import { 
    test,
    addCart,
    deleteCart
} from './shoppingCart.controller.js'

const api = express.Router()

api.get('/test', /*[validateJwt, isAdmin],*/ test)
api.post('/addCart', addCart)
api.delete('/deleteCart/:id', deleteCart)



export default api