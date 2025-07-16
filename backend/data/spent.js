const { GetCollection } =  require("./mongodb")

const collName = "spent"

async function GetSpent() {
    const coll = await GetCollection(collName);
    return await coll.find({}).toArray();
}

async function createSpent(spent) {
    const coll = await GetCollection(collName);
    const result = await coll.insertOne(spent);
    return result.insertedId;
}

module.exports = {
    GetSpent,
    createSpent
};