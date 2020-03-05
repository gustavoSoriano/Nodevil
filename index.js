const app     = require('./config/express')()
const consign = require('consign')
const http    = require('http').createServer(app)

require('./config/database')()
consign({ cwd: 'app' }).include('models').then('controllers').then('middlewares').then('routes').then('graphql').into(app)
http.listen(app.get('port'), () => console.log(`Server escutando na porta ${app.get('port')}`))
