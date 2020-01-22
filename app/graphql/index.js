const { buildSchema } = require('graphql')
const graphqlHTTP     = require('express-graphql')

module.exports = async app => {
    await app.graphql
    const {users} = app.graphql

    app.use('/graphql', graphqlHTTP({ 
        schema: buildSchema(`
            ${users.types}
            ${users.inputs}

            type Query {
                ${users.queries}
            }

            type Mutation {
                ${users.mutations}
            }
        `), 
        rootValue: {
            ...users.methods
        }, 
        graphiql: true 
    }))
}
