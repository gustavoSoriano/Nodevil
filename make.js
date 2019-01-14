#!/usr/bin/env node 

const util = require('util')
const fs   = require('fs')
const exec = util.promisify(require('child_process').exec)
const args = process.argv.slice(2)

async function gitClone(nome) {
   let { stdout, stderr } = await exec(`git clone https://github.com/gustavoSoriano/node-mvc.git ${nome}`)
   if (stderr) return console.error(stderr)

   let { out, err } = await exec('mv node-mvc ../')
   if (err) return console.error(err)
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


const CONTROLLER_CRUD = nome => {
return `
const Resolver = promise => promise.then(result => [null, result]).catch(error => [error])
module.exports = app => {
    const ${nome}Model  = app.models.${nome}
    const controller = {}

    controller.findAll = async (req, res) => {
      const [error, dados] = await Resolver( ${nome}Model.find({}) )
      if (error) return res.json(error)
      res.json(dados)
    }

    controller.get = async (req, res) => {
      const [error, dados] = await Resolver( ${nome}Model.findOne({"_id": req.params.id}) )
      if (error) return res.json(error)
      res.json(dados)
    }

    controller.create = async (req, res) => {
      const [error, dados] = await Resolver( ${nome}Model.create(req.body) )
      if (error) return res.json(error)
      res.json(dados)
    }

    controller.edit = async (req, res) => {
      const [error, dados] = await Resolver( ${nome}Model.updateOne({"_id":req.body._id}, {$set: req.body}) )
      if (error) return res.json(error)
      res.json(dados)
    }

    controller.remove = async (req, res) => {
      const [error, dados] = await Resolver( ${nome}Model.deleteOne({"_id":req.params.id}) )
      if (error) return res.json(error)
      res.json(dados)
    }

    return controller
}
`
}




const MODEL = nome => {
return `
const mongoose = require('mongoose')
module.exports = app => {
   const schema = mongoose.Schema({
      /* Definir schema */
   },{versionKey: false})
   schema.set('timestamps', true)
   return mongoose.model('${nome}', schema)
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
module.exports   = app => {
   const ${nome}   = app.controllers.${nome}

   app.get('/${nome}', ${nome}.findAll)
   app.get('/${nome}/:id', ${nome}.get)
   app.post('/${nome}', ${nome}.create)
   app.put('/${nome}', ${nome}.edit)
   app.delete('/${nome}/:id', ${nome}.remove)
}
`
}


if (args[0] == "new") 
{
   //gitClone(args[1])
}
else if( args[0] == "generate:key" )
{
   let k = ''
   for(let i=0; i < 4; i++)
      k += [ ...Math.random().toString('32').substr(2) ].join('')

   let config    = JSON.parse( fs.readFileSync(`config/config.json`, 'utf8') )
   config.secret = k
   config        = JSON.stringify(config)
   config        = config.split(',').join(',\n')
   config        = config.split('{').join('{\n')
   config        = config.split('}').join('\n}')

   fs.writeFileSync(`config/config.json`, config )
   console.log( "Secret gerada com sucesso!" )
}
else if (args[0].match(/controller:/)) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/controllers/${make[1]}.js`, CONTROLLER(make[1]))
   console.log("Controller criada com sucesso!")
}
else if (args[0].match(/model:/)) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/models/${make[1]}.js`, MODEL(make[1]))
   console.log("Model criada com sucesso!")
}
else if (args[0].match(/view:/)) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/views/${make[1]}.html`, VIEW(make[1]))
   console.log("View criada com sucesso!")
}
else if (args[0].match(/middleware:/)) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/middlewares/${make[1]}.js`, MIDDLEWARE(make[1]))
   console.log("Middleware criada com sucesso!")
}
else if (args[0].match(/crud:/)) 
{
   let make = args[0].split(":")
   fs.writeFileSync(`app/controllers/${make[1]}.js`, CONTROLLER_CRUD(make[1]))
   fs.writeFileSync(`app/models/${make[1]}.js`, MODEL(make[1]))
   fs.writeFileSync(`app/routes/${make[1]}.js`, ROUTE(make[1]))
   console.log("Crud criado com sucesso!")
}
else
   console.log("Comando make com assinatura inválida")
