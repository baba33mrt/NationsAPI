const {makeRequest, getQueryString} = require('../utils/request');

const NgIslandAPI = (apiToken) => ({

    async getAllIslands(page = 1) {
        if (typeof page !== 'number') throw new Error('Invalid page');
        const params = { page };
        const queryString = await getQueryString(params);

        return makeRequest(apiToken, 'GET', `ngisland/list${queryString}`);
    },

})

module.exports = NgIslandAPI;
