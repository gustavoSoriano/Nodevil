const {Router}   = require('express'), router = Router()

module.exports   = app => {
    const user   = app.controllers.user
    const {auth} = app.middlewares.auth

    router.get('/mongo', user.findUsersMongo)
    router.get('/mysql', user.findUsersMysql)
    
    //config middleware
    router.use( auth )

    router.get('/:id', user.get)
    router.post('/', user.create)
    router.put('/', user.edit)
    router.delete('/:id', user.remove)
    return router
}