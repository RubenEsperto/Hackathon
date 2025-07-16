const { GetRations, GetRationById, UpdateRation } = require("../data/ration");

async function fetchRations() {
    return await GetRations();
}

async function fetchRationById(id) {
    return await GetRationById(id);
}

async function modifyRation(id, update) {
    return await UpdateRation(id, update);
}

module.exports = {
    fetchRations,
    fetchRationById,
    modifyRation
};