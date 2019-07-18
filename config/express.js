const bodyParser     = require('body-parser')
const express        = require('express')
const config         = require('./config.json')
const expressLayouts = require('express-ejs-layouts')

module.exports = () => {
    const app  = express()
    app.set('view engine', 'ejs')
    app.set('views', __dirname + '/../app/views' )
    app.use(expressLayouts)

    app.set('port', config.app_port)
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
