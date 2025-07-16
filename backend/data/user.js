const { GetCollection } =  require("./mongodb")

const collName = "user"

async function findUser(name) {
    const col = await GetCollection(collName)
    const result = await col.findOne({name : name})
    return result
}

module.exports = {
    findUser
}