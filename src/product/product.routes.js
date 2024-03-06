'use strict'

import express from "express"
import { 
    test,
    saveP,
    updateP,
    getProductById,
    listP,
    findSoldOutProducts,
    deleteP,
    inventoryControl
} from "./product.controller.js"

const api = express.Router()

api.get('/test', test)
api.post('/saveP', saveP)
api.put('/updateP/:id', updateP)
api.get('/getProductById/:id', getProductById)
api.get('/listP', listP)
api.get('/findSoldOutProducts', findSoldOutProducts)
api.delete('/deleteP/:id', deleteP)
api.get('/inventoryControl', inventoryControl)

export default api