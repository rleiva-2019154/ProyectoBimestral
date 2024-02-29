'use strict'

import express from 'express'
import { 
        test,
        saveC,
        updateC,
        listC 
    } from "./category.controller.js"

const api = express.Router()

api.get('/test', test)
api.post('/saveC', saveC)
api.put('/updateC/:id', updateC)
api.get('/listC', listC)

export default api