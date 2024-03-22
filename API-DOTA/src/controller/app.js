const express = require('express')
const server = express()
const dados = require('../data/herois.json')
const fs = require('fs')
const cors = require('cors')

// controller
const heroisRouter = require('./controllerHerois')

// função para utilizar o servidor
server.use(express.json())
server.use(cors())

server.use('/API-DOTA', heroisRouter.server)

// mensagem no terminal para indicar o funcionamento
server.listen(3000, () =>{
    console.log(`O servidor está funcionando! :D`);
})
