const { GetSpent, updateSpent, createSpent } = require("../data/spent");

async function fetchSpent() {
    return await GetSpent();
}

async function modifySpent(id, update) {
    return await updateSpent(id, update);
}

async function createNewSpent(spent) {
    return await createSpent(spent);
}

module.exports = {
    fetchSpent,
    modifySpent,
    createNewSpent
};