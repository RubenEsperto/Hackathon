const { GetCollection } =  require("./mongodb")

const collName = "spent"

async function GetSpent() {
    const coll = await GetCollection(collName);
    return await coll.find({}).toArray();
}

async function updateSpent(id, update) {
    const coll = await GetCollection(collName);
    const result = await coll.updateOne(
        { _id: id }, 
        { $set: {quantity: update}}
    );
    return result.modifiedCount > 0;
}

async function createSpent(spent) {
    const coll = await GetCollection(collName);
    const result = await coll.insertOne(spent);
    return result.insertedId;
}

module.exports = {
    GetSpent,
    updateSpent,
    createSpent
};