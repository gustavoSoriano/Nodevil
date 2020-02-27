module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            nome: 'John',
            senha: '321',
            login: 'John@John.com',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nome: 'Mary',
            senha: '123',
            login: 'Mary@Mary.com',
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },
    
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {})
    }
}
