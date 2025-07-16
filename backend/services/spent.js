const { GetSpent, createSpent } = require("../data/spent");

async function fetchSpent() {
    return await GetSpent();
}

async function createNewSpent(spent) {
    return await createSpent(spent);
}

module.exports = {
    fetchSpent,
    createNewSpent
};