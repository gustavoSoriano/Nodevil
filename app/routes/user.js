module.exports   = app => {
    const user   = app.controllers.user
    const {auth} = app.middlewares.auth

    app.get('/user', user.findAll)
    app.get('/user/:id', auth, user.get)
    app.post('/user', auth, user.create)
    app.put('/user', auth, user.edit)
    app.delete('/user/:id', auth, user.remove)
}