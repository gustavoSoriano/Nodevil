module.exports = app => {
    app.post('/login', app.controllers.login.login)
}