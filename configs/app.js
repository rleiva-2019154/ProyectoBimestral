//Levanta el servidor http
//ESModules

'use strict'

//Importaciones
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from 'cors'
import { config } from "dotenv"

//Configuraciones
const app = express()
config()
const port = process.env.PORT || 3056

//Configuracion del servidors

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) //Aceptar o denegar solicitudes de diferentes origenes (local, remoto) / politicas de acceso
app.use(helmet()) //Aplica capa de seguridad basica al servidor
app.use(morgan('dev')) //Logs de solicitudes al servidor HTTP

//Declaracion de rutas

//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP runin in port ${port}`)
}