const {debug, mongodb, sequelizedb} = require('./config.json')

const useMongoDb   = () => {
    const mongoose = require('mongoose')
    mongoose.set('debug', debug.mongoose)
    mongoose.Promise = global.Promise
    mongoose.connect(mongodb.uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    mongoose.connection.on('connected', () =>  console.log(`Mongoose! Conectado`))
    mongoose.connection.on('disconnected', () =>  console.log(`Mongoose! Desonectado`))
    mongoose.connection.on('error', e => console.log(`Mongoose! Erro de conexão: ${e}`))
    process.on('SIGINT', () => mongoose.connection.close(() => process.exit(0) ))
}

const useSequelize = () => {
    const Sequelize = require('sequelize')
    return new Sequelize(sequelizedb)
}

module.exports = () => ({
    mongodb: mongodb ? useMongoDb() : null,
    sequelize: sequelizedb ? useSequelize() : null
})
