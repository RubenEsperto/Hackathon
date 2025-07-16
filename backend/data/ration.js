const { GetCollection } =  require("./mongodb")

const collName = "rations";

async function GetRations() {
    const coll = await GetCollection(collName);
    return await coll.find({}).toArray();
}

async function GetRationById(id) {
    const coll = await GetCollection(collName);
    return await coll.findOne({ _id: id });
}

async function UpdateRation(id, update) {
    const coll = await GetCollection(collName);
    const result = await coll.updateOne(
        { _id: id }, 
        { $set: {quantity: update}}
    );
    return result.modifiedCount > 0;
}

module.exports = {
    GetRations,
    GetRationById,
    UpdateRation
};
