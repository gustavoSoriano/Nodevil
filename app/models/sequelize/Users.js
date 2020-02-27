const { sequelizedb } = require('../../../config/config.json')
const {sequelize}     = require("../../../config/database")()
const { STRING }      = require('sequelize')

module.exports   = () => {
    
    const schema = {
        nome: STRING,
        login: STRING,
        senha: STRING
    }

    return sequelizedb ? sequelize.define('User', schema) : null
}
