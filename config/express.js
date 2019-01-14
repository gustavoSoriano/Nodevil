const load       = require('express-load')
const bodyParser = require('body-parser')
const express    = require('express')
const config     = require('./config.json')

module.exports = () => {
    const app  = express()
    app.use('/', express.static(__dirname + '/../app/views'))

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

    load('models', { cwd: 'app'}).then('controllers').then('middlewares').then('routes').into(app)
    return app
}
