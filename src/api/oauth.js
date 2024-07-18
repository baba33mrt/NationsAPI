const {makeRequest, getQueryString} = require('../utils/request');

class OAuthAPI {
    constructor(apiToken) {
        this.apiToken = apiToken;
    }

    async createService(name, redirectUri) {
        if (name && typeof name !== 'string') throw new Error('Invalid name');
        if (redirectUri && typeof redirectUri !== 'string') throw new Error('Invalid redirect Uri');
        const data = { name: name, redirect_uri: redirectUri };
        return makeRequest(this.apiToken, 'PUT', 'oauth/create', data);
    }

    async deleteService() {
        return makeRequest(this.apiToken, 'DELETE', `oauth/delete`);
    }

    async checkAccessToken(access_token, client_secret) {
        if (access_token && typeof access_token !== 'string') throw new Error('Invalid access token');
        if (client_secret && typeof client_secret !== 'string') throw new Error('Invalid client secret');
        const params = {access_token, client_secret}
        const queryString = await getQueryString(params);
        return makeRequest(null, 'GET', `oauth/checkToken${queryString}`);
    }

    async patchService(redirectUri, contact, name) {
        if (redirectUri && typeof redirectUri !== 'string') throw new Error('Invalid redirect Uri');
        if (contact && typeof contact !== 'string') throw new Error('Invalid contact');
        if (name && typeof name !== 'string') throw new Error('Invalid name');
        const data = { redirect_uri: redirectUri, contact: contact, name: name };
        return makeRequest(this.apiToken, 'PATCH', 'oauth/patch', data);
    }
}

module.exports = OAuthAPI;
