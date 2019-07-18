const {Router}   = require('express'), router = Router()

module.exports   = app => {
    router.post('/login', app.controllers.login.login)
    return router
}