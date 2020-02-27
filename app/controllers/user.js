const passwordHash = require('password-hash')

module.exports = app => {
    const userModel  = app.models.mongoose.user
    const userMysql  = app.models.sequelize.Users
    const controller = {}

    controller.findUsersMongo = async (req, res) => {
        try{
            const dados = await userModel.find({})  
            app.table( "Usuários vindo do mongodb", JSON.parse( JSON.stringify(dados) ) )
            res.json( dados )
        } catch (err){
            console.error(err)
            res.status(500).json(err)
        }
    }

    controller.findUsersMysql = async (req, res) => {
        try{
            const dados = await userMysql.findAll({})  
            app.table( "Usuários vindo do mysql", JSON.parse( JSON.stringify(dados) ) )
            res.json( dados )
        } catch (err){
            console.error(err)
            res.status(500).json(err)
        }
    }

    controller.get = async (req, res) => {
        try{
            const u = await userModel.findOne({"_id": req.params.id}, {senha:false})                
            res.json(u)
        } catch (err){
            console.error(err)
            res.status(500).json(err)
        }
    }

    controller.create = async (req, res) => {
        req.body.senha = passwordHash.generate( req.body.senha )

        try{
            let u = await userModel.create(req.body)                
            res.json(u)
        } catch (err){
            console.error(err)
            res.status(500).json(err)
        }
    }

    controller.edit = async (req, res) => {
        if(!req.body.senha)
            delete req.body.senha
        else 
            req.body.senha = passwordHash.generate( req.body.senha )

        try{
            let u = await userModel.updateOne({"_id":req.body._id}, {$set: req.body})                
            res.json(u)
        } catch (err){
            console.error(err)
            res.status(500).json(err)
        }
    }

    controller.remove = async (req, res) => {
        try{
            const u = await userModel.deleteOne({"_id":req.params.id})                
            res.json(u)
        } catch (err){
            console.error(err)
            res.status(500).json(err)
        }
    }

    return controller
}