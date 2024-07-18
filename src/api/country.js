const {makeRequest, getQueryString} = require('../utils/request');

class CountryAPI {
    constructor(apiToken) {
        this.apiToken = apiToken;
    }

    async getNotations(server, week=Math.floor((Date.now() / 1000 - 342100) / 604800) - 1, country = null) {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        if (week && typeof week !== 'number') throw new Error('Invalid week');
        if (country && typeof country !== 'string') throw new Error('Invalid country');

        const params = { week, country, server };
        const queryString = await getQueryString(params);
        return makeRequest(this.apiToken,'GET', `notations${queryString}`);
    }

    async get(server, country) {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        if (country && typeof country !== 'string') throw new Error('Invalid country');
        return makeRequest(this.apiToken, 'GET', `country/${server}/${country}`);
    }

    async get(server) {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        return makeRequest(this.apiToken, 'GET', `country/list/{server}`);
    }
}

module.exports = CountryAPI;
