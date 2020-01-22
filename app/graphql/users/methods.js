module.exports = app => {
    const {user:userModel} = app.models

    return {
        getUsers: async () => await userModel.find({}),
        getUser: async ({id}) => await userModel.findOne({ _id: id }),
    
        setUser: async ({input}) => {
            let inserted = await userModel.create(input)
            return inserted
        }
    }
}