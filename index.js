const app    = require('./config/express')()
const config = require('./config/config.json')
const load   = require('express-load')
http         = require('http').createServer(app)
require('./config/database')(config.mongo_connect + config.db_name)

load('models', { cwd: 'app'}).then('controllers').then('middlewares').then('routes').into(app)
http.listen(app.get('port'), () => console.log(`Server escutando na porta ${app.get('port')}`) )
