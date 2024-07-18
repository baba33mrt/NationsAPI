const {makeRequest, getQueryString} = require('../utils/request');

class ServerAPI {
    constructor(apiToken) {
        this.apiToken = apiToken;
    }

    async getPlanning(server, month, year) {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        if (month && typeof month !== 'number') throw new Error('Invalid month');
        if (year && typeof year !== 'number') throw new Error('Invalid year');
        const params = { server, month, year };
        const queryString = await getQueryString(params);
        return makeRequest(this.apiToken, 'GET', `planning${queryString}`);
    }

    async getPlayersCount() {
        return makeRequest(this.apiToken, 'GET', 'playercount');
    }

    async getHDV(server) {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        return makeRequest(this.apiToken, 'GET', `hdv/${server}/list`);
    }
}

module.exports = ServerAPI;
