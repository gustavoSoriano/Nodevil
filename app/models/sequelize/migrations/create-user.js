module.exports = {
    up: (queryInterface, {INTEGER, STRING, DATE}) => {

        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: INTEGER,
            },
            nome: {
                allowNull: false,
                type: STRING,
            },
            login: {
                allowNull: false,
                type: STRING,
                unique: true,
            },
            senha: {
                allowNull: false,
                type: STRING,
            },
            createdAt: {
                allowNull: false,
                type: DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DATE,
            },
        })

    },


    down: (queryInterface) => {
        queryInterface.dropTable('Users')
    }
}
