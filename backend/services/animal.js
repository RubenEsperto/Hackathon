const { GetAnimals, GetAnimalById, AddAnimal, UpdateAnimal, DeleteAnimal} = require("../data/animal");

async function createAnimal(animal) {
    return await AddAnimal(animal);
}

async function fetchAnimals() {
    return await GetAnimals();
}

async function fetchAnimalById(id) {
    return await GetAnimalById(id);
} 

async function modifyAnimal(id, update) {
    return await UpdateAnimal(id, update);
}

async function deleteAnimal(id) {
    return await DeleteAnimal(id);
}

module.exports = {
    createAnimal,
    fetchAnimals,
    fetchAnimalById,
    modifyAnimal,
    deleteAnimal
};