const axios = require('axios');

class NationsAPI {
    constructor(apiToken) {
        this.apiToken = apiToken;
        this.baseURL = 'https://publicapi.nationsglory.fr/';
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.apiToken}`
        };
    }

    async getPlayersCount() {
        return this._makeRequest('GET', 'playercount');
    }

    async getNotations(week=Math.floor((Date.now() / 1000 - 342100) / 604800) - 1, country = null, server) {
        const params = { week, country, server };
        const queryString = this._getQueryString(params);
        return this._makeRequest('GET', `notations${queryString}`);
    }

    async getPlanning(server, month, year) {
        const params = { server, month, year };
        const queryString = this._getQueryString(params);
        return this._makeRequest('GET', `planning${queryString}`);
    }

    async getUser(username) {
        return this._makeRequest('GET', `user/${username}`);
    }

    async getCountry(server, country) {
        return this._makeRequest('GET', `country/${server}/${country}`);
    }

    _getQueryString(params) {
        const queryParams = new URLSearchParams(params);
        return '?' + queryParams.toString();
    }

    async _makeRequest(method, endpoint, data = null) {
        try {
            const response = await axios({
                method: method,
                url: `${this.baseURL}${endpoint}`,
                headers: this.headers,
                data: data
            });
            return response.data;
        } catch (error) {
            console.error(`Error making request to ${endpoint}:`, error.response.data);
            return { error: error.response.data };
        }
    }
}

module.exports = NationsAPI;