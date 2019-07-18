const {Router} = require('express'), router = Router()

module.exports = async app => {
   await app.routes
   Object.values( app.routes.api ).forEach( fnc => router.use('/api', fnc))
   app.use(router)
}