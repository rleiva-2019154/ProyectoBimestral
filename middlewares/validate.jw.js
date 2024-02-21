'use strict'

import jwt from 'jsonwebtoken'
import User from '../src/user/user.model.js'

export const validateJwt = async(req, res, next) =>{
    try {
        //Obtener la llave de accseso al token
        let secretKey = process.env.SECRET_KEY
        //Obtener el token de los header
        let {token} = req.headers
        //Verificar si viene el token
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        //obtener el uid del usuario que envio el token
        let { uid } = jwt.verify(token, secretKey)
        //validar si aun existe en la bd
        let yser = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'User not found - Unauthorized'})
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message: 'Invalid token'})
    }
}

export const isAdmin = async(req, res, next) =>{
    try {
        let {user} = req
        if(!user || user.role !== 'ADMIN') return res.status(403).send({message: `You dont hace access | username: ${user.username}`})
        next()
    } catch (err) {
        console.error(err)
        return res.status(403).send({message: 'Unauthorized role'})
    }
}