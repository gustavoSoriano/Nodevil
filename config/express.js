const bodyParser     = require('body-parser')
const express        = require('express')
const logger         = require('morgan')
const {app_port, debug} = require('./config.json')
const expressLayouts = require('express-ejs-layouts')
const debugHelper    = require("../app/helpers/debug")

module.exports = () => {
    const app  = express()
    app.set('view engine', 'ejs')
    app.set('views', __dirname + '/../app/views' )
    app.use(expressLayouts)

    if(debug.request_log)app.use(logger('dev'))

    app.set('port', app_port)
    app.debug = debugHelper

    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(bodyParser.json())
    app.use(require('method-override')())

    app.use( (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        res.header('Access-Control-Allow-Credentials', true)
        next()
    })

    return app
}
