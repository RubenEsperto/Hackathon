const { GetRations, GetRationById, UpdateRation } = require("../data/ration");
const { ObjectId } = require("mongodb");

async function fetchRations() {
    return await GetRations();
}

async function fetchRationById(id) {
    const newId = new ObjectId(id)
    return await GetRationById(newId);
}

async function modifyRation(id, update) {
    const newId = new ObjectId(id)
    const newUpdate = update + "t"
    return await UpdateRation(newId, newUpdate);
}

module.exports = {
    fetchRations,
    fetchRationById,
    modifyRation
};