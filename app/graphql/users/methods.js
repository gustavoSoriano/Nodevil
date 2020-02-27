module.exports = app => {
    const {user:userModel} = app.models.mongoose
    const {Users:userMysql} = app.models.sequelize

    return {
        getUsersMysql: async () => await userMysql.findAll({}),
        
        getUsers: async () => await userModel.find({}),
        getUser: async ({id}) => await userModel.findOne({ _id: id }),
    
        setUser: async ({input}) => {
            let inserted = await userModel.create(input)
            return inserted
        }
    }
}