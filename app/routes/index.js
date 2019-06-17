const {Router} = require('express'), router = Router()

module.exports = async app => {
   await app.routes

   router.use('/user', app.routes.user)

   app.use(router)
}