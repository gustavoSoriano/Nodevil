const jwt      = require('jsonwebtoken')
const config   = require('../../config/config.json')

module.exports = () => {
    let middlewares = {}

    middlewares.auth = (req, res, next) => {
        if(req.path == '/login' || req.method == "OPTIONS" )return next()
        const bearerHeader = req.headers['authorization']
    
        if(typeof bearerHeader !== 'undefined') 
        {
            const bearer      = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            req.token         = bearerToken
    
            jwt.verify(bearerToken, config.secret, (err, authData) => {
                return (err) ? res.status(401).json({status:false, message:'token inválido'}) : next()      
            })
        } 
        else 
            res.status(403).json({status:false, message:'Token é obrigatório'})
    }

    return middlewares
}

