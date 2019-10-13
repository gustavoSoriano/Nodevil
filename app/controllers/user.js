const passwordHash = require('password-hash')

module.exports = app => {
    const userModel  = app.models.user
    const controller = {}

    controller.findAll = async (req, res) => {
        try{
            const dados = await userModel.find({},{senha:false})   
            res.json( dados )
            app.debug("Usuários", JSON.parse( JSON.stringify(dados) ), "table")
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