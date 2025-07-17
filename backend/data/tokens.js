const { ObjectId } = require("mongodb")
const { GetCollection } = require("./mongodb")


function isValidObjectId(id) {
  return typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
}


const COLLECTION = "tokens"

async function insertToken(userId) {
    const col = await GetCollection(COLLECTION)

    const res = await col.insertOne({uid: userId})

    return res.insertedId
}


async function findToken(token) {
  console.log("Token recebido:", token);

  if (!isValidObjectId(token)) {
    console.warn("Token inválido, ignorando.");
    return null;
  }

  const new_token = new ObjectId(token);
  const col = await GetCollection(COLLECTION);
  const res = await col.findOne({ _id: new_token });

  return res;
}

async function deleteToken(token) {
    const new_token = new ObjectId(String(token))
    
    const col = await GetCollection(COLLECTION)

    const res = await col.deleteOne({_id: new_token})

    return
}


module.exports = {insertToken, findToken, deleteToken}