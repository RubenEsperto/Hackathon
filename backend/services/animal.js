const { GetAnimals, GetAnimalById, AddAnimal, UpdateAnimal, DeleteAnimal} = require("../data/animal");
const { ObjectId } = require("mongodb");

async function createAnimal(animal) {
    animal.ration.id = new ObjectId(animal.ration.id);
    animal.ration.quantity = animal.ration.quantity;
    return await AddAnimal(animal);
}

async function fetchAnimals() {
    return await GetAnimals();
}

async function fetchAnimalById(id) {
    const newId = new ObjectId(id);
    return await GetAnimalById(newId);
} 

async function modifyAnimal(id, update) {
  const newId = new ObjectId(id);
  const animal = await GetAnimalById(newId);

  // update já é string tipo "500g" ou "10t"
  const newUpdate = { ...animal.ration, quantity: update };

  return await UpdateAnimal(newId, newUpdate);
}

async function deleteAnimal(id) {
    const newId = new ObjectId(id);
    return await DeleteAnimal(newId);
}

module.exports = {
    createAnimal,
    fetchAnimals,
    fetchAnimalById,
    modifyAnimal,
    deleteAnimal
};