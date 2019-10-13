const mongoose = require('mongoose')
const {debug}  = require('./config.json')

mongoose.set('debug', debug.mongoose)
module.exports = uri => {
    mongoose.Promise = global.Promise
    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    mongoose.connection.on('connected', () =>  console.log(`Mongoose! Conectado em ${uri}`))
    mongoose.connection.on('disconnected', () =>  console.log(`Mongoose! Desonectado de ${uri}`))
    mongoose.connection.on('error', erro => console.log(`Mongoose! Erro de conexão: ${erro}`))
    process.on('SIGINT', () => mongoose.connection.close(() => process.exit(0) ))
}
