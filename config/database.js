const mongoose = require('mongoose')
const config   = require('./config.json')

mongoose.set('debug', config.debug_mongoose)
module.exports = uri => {
    mongoose.Promise = global.Promise

    mongoose.connect(uri, { useNewUrlParser: true })

    mongoose.connection.on('connected', () =>  {
        console.log('Mongoose! Conectado em '+uri)
    })
    mongoose.connection.on('disconnected', () =>  {
        console.log('Mongoose! Desonectado de '+uri)
    })
    mongoose.connection.on('error', erro => {
        console.log('Mongoose! Erro de conexão: '+erro)
    })

    process.on('SIGINT', () => {
       mongoose.connection.close(() => process.exit(0) )
    })
}