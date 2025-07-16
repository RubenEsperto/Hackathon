const {findUser} = require('../data/user.js');

async function getUser(name) {
    return await findUser(name);
}

module.exports = {
    getUser
};