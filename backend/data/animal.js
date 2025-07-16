const { GetCollection } =  require("./mongodb")

const collName = "animals"

async function GetAnimals() {
    const coll = await GetCollection(collName);
    return await coll.find({}).toArray();
}

async function GetAnimalById(id) {
    const coll = await GetCollection(collName);
    return await coll.findOne({ _id: id });
}

async function AddAnimal(animal) {
    const coll = await GetCollection(collName);
    const result = await coll.insertOne(animal);
    return result.insertedId;
}

async function UpdateAnimal(id, update) {
    const coll = await GetCollection(collName);
    const result = await coll.updateOne(
        { _id: id }, 
        { $set: {ration: update}}
    );
    return result.modifiedCount > 0;
}

async function DeleteAnimal(id) {
    const coll = await GetCollection(collName);
    const result = await coll.deleteOne({ _id: id });
    return result.deletedCount > 0;
}

module.exports = {
    GetAnimals,
    GetAnimalById,
    AddAnimal,
    UpdateAnimal,
    DeleteAnimal
};