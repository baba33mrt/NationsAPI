const {makeRequest, getQueryString} = require('../utils/request');
const {base64ToBuffer} = require("../utils/converters");

const NgIslandAPI = (apiToken) => ({

    async getAllIslands(page = 1) {
        if (typeof page !== 'number') throw new Error('Invalid page');
        const params = { page };
        const queryString = await getQueryString(params);

        return makeRequest(apiToken, 'GET', `ngisland/list${queryString}`);
    },

    // async convertFlagToBuffer(image) {
    //    return base64ToBuffer(image);
    // }
})

module.exports = NgIslandAPI;
