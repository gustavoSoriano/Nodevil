const http   = require('http')
const app    = require('./config/express')()
const config = require('./config/config.json')

require('./config/database')(config.mongo_connect + config.db_name)

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Server escutando na porta ${app.get('port')} `)
})