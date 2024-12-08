const {makeRequest} = require('../utils/request');

const UserAPI = (apiToken) => ({

    async get(username) {
        if (username && typeof username !== 'string' || username === '') throw new Error('Invalid username');
        return makeRequest(apiToken, 'GET', `user/${username}`);
    }

})

module.exports = UserAPI;
