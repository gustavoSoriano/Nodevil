#!/usr/bin/env node 

const util = require('util')
const fs   = require('fs')
const exec = util.promisify(require('child_process').exec)
const args = process.argv.slice(2)

async function installSocket() {
   let { stdout, stderr } = await exec(`npm i --save socket.io`)
   console.log("socket.io instalado com sucesso!")
   if (stderr) return console.error(stderr)
}



const CONTROLLER = nome => {
return `
module.exports = app => {
    const controller = {}

    controller.${nome} = async (req, res) => {
        console.log( "controller ${nome} " )
    }

    return controller
}
`
}


const CONTROLLER_CRUD = (nome, type) => {
return `
module.exports = app => {
   const ${nome}Model = app.models.${type}.${nome}
   const controller   = {}

   controller.findAll = async (req, res) => {
     try {  
       res.json( await ${nome}Model.find({}) )
     } 
     catch (error) {
        res.status(500).json({ details: error })
     }
   }

   controller.create = async (req, res) => {
     try {  
       let r = await ${nome}Model.create(req.body)
       res.json({status:true, message: "cadastrado com sucesso"})
     } catch (error) {
       res.status(500).json({ details: error })
     }
   }

   controller.edit = async (req, res) => {
     try {  
       let r = await ${nome}Model.updateOne({"_id":req.body._id}, {$set: req.body}) 
       res.json({status:true, message: "alterado com sucesso"})
     } catch (error) {
       res.status(500).json({ details: error })
     }
   }

   controller.remove = async (req, res) => {
     try {  
       let r = await ${nome}Model.deleteOne({"_id":req.params.id}) 
       res.json({status:true, message: "removido com sucesso"})
     } catch (error) {
       res.status(500).json({ details: error })
     }
   }

   return controller
}
`
}




const MODEL_MONGOOSE = nome => {
return `
const { mongodb } = require('../../../config/config.json')
const mongoose    = require('mongoose')

module.exports = () => {
    
    const schema = mongoose.Schema({
        /* Definir schema */
    },{versionKey: false})
    schema.set('timestamps', true)

    return mongodb ? mongoose.model('user', schema) : null
}
`
}


const MODEL_SEQUELIZE = nome => {
return `
const { sequelizedb } = require('../../../config/config.json')
const {sequelize}     = require("../../../config/database")()
const { INTEGER, STRING, DATE } = require('sequelize')

module.exports   = () => {
    
    const schema = {
        /* Definir schema */
    }

    return sequelizedb ? sequelize.define('${nome}', schema) : null
}
`
}


const VIEW = () => {
return `
<!DOCTYPE html>
<html lang="pt-br">
   <head>
      <title>Welcome</title>
      <meta charset="utf-8">
   </head>
   <body>
      <h1>Hello world</h1>
   </body>
</html>
`
}


const MIDDLEWARE = nome => {
return `
module.exports = app => {
   let middlewares = {}

   middlewares.${nome} = (req, res, next) => {
      console.log( 'middleware ', ${nome} )
   }

   return middlewares
}
`
}


const ROUTE = nome => {
return `
const {Router}   = require('express'), router = Router()

module.exports   = app => {
   const ${nome} = app.controllers.${nome}

   router.get('/${nome}', ${nome}.findAll)
   router.post('/${nome}', ${nome}.create)
   router.put('/${nome}', ${nome}.edit)
   router.delete('/${nome}/:id', ${nome}.remove)
   return router
}
`
}


if (args[0] == "install:socket" ) 
{
   installSocket()
   let config = `\napp.io = require('socket.io')(http)\napp.io.set('origins', '*:*')\n`
   let dados  = fs.readFileSync(`index.js`, 'utf8').replace(config,'').split('\n')
   dados[4]  += config
   fs.writeFileSync(`index.js`, dados.join('\n') )
}
else if( args[0] == "generate:key" )
{
   let k = ''
   for(let i=0; i < 4; i++)
      k += [ ...Math.random().toString('32').substr(2) ].join('')

   let config    = JSON.parse( fs.readFileSync(`config/config.json`, 'utf8') )
   config.secret = k
   config        = JSON.stringify(config, null, '\t')
   fs.writeFileSync(`config/config.json`, config )
   console.log( "Secret gerada com sucesso!" )
}
else if ( args[0].includes("controller:") ) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/controllers/${make[1]}.js`, CONTROLLER(make[1]))
   console.log("Controller criada com sucesso!")
}
else if ( args[0].includes("model[mogoose]:") ) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/models/mongoose/${make[1]}.js`, MODEL_MONGOOSE(make[1]))
   console.log("Model criada com sucesso!")
}
else if ( args[0].includes("model[sequelize]:") ) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/models/sequelize/${make[1]}.js`, MODEL_SEQUELIZE(make[1]))
   console.log("Model criada com sucesso!")
}
else if ( args[0].includes("view:") ) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/views/${make[1]}.html`, VIEW(make[1]))
   console.log("View criada com sucesso!")
}
else if ( args[0].includes("middleware:") ) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/middlewares/${make[1]}.js`, MIDDLEWARE(make[1]))
   console.log("Middleware criada com sucesso!")
}
else if ( args[0].includes("crud[mongoose]:") ) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/controllers/${make[1]}.js`, CONTROLLER_CRUD(make[1], 'mongoose'))
   fs.writeFileSync(`app/models/mongoose/${make[1]}.js`, MODEL_MONGOOSE(make[1]))
   fs.writeFileSync(`app/routes/api/${make[1]}.js`, ROUTE(make[1]))
   console.log("Crud criado com sucesso!")
}
else if ( args[0].includes("crud[sequelize]:") ) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/controllers/${make[1]}.js`, CONTROLLER_CRUD(make[1], 'sequelize'))
   fs.writeFileSync(`app/models/sequelize/${make[1]}.js`, MODEL_SEQUELIZE(make[1]))
   fs.writeFileSync(`app/routes/api/${make[1]}.js`, ROUTE(make[1]))
   console.log("Crud criado com sucesso!")
}
else
   console.log("Comando make com assinatura inválida ", args[0].includes("crud[mongoose]:") )
