const jwt          = require('jsonwebtoken')
const config       = require('../../config/config.json')
const passwordHash = require('password-hash')

module.exports = app => {
    const userModel  = app.models.user
    const controller = {}

    controller.login = async (req, res) => {
        let {login, senha} = req.body

        try{
            let u = await userModel.findOne({login})
            if( !u || !passwordHash.verify( senha, u.senha ) ) 
                return res.json({status:false, message:"Usuário ou login inválido"})

            let usuario = {...u._doc}
            delete usuario.senha
            jwt.sign({usuario}, config.secret, { expiresIn: config.expiresIn }, (err, token) => {
                return res.json({usuario, token: 'bearer '+ token })
            })
        } catch (err){
            res.status(500).json(err)
        }
    }

    return controller
}