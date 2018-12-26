const mongoose = require('mongoose')

module.exports = () => {
    const schema = mongoose.Schema({
        nome:{
            type: String,
            require:true
        },
        login: {
            type: String,
            required: true,
            index: { unique: true },
            dropDups: true,
            validate: [ v => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v), 'E-mail inválido']
        },
        senha: {
            type: String,
            required: true
        }
    },{versionKey: false})
    schema.set('timestamps', true)
    return mongoose.model('user', schema)
}