const {makeRequest} = require('../utils/request');

const WebhooksAPI = (apiToken) => ({

    async _registerWebhook(url, eventType) {
        if (typeof url !== 'string' || url === '') throw new Error('Invalid URL');
        if (typeof eventType !== 'string' || eventType === '') throw new Error('Invalid eventType');
        const data = { url: url, eventType: eventType}
        return makeRequest(apiToken, 'POST', 'webhook/register', data);
    },

    async createCountry(url) {
        if (typeof url !== 'string' || url === '') throw new Error('Invalid URL');
        return this._registerWebhook(url, 'country.created');
    },

    async disbandCountry(url) {
        if (typeof url !== 'string' || url === '') throw new Error('Invalid URL');
        return this._registerWebhook(url, 'country.disbanded');
    },

    async changeLeader(url) {
        if (typeof url !== 'string' || url === '') throw new Error('Invalid URL');
        return this._registerWebhook(url, 'country.changeleader');
    },

    async getWebhook(webhookId) {
        if (typeof webhookId !== 'number') throw new Error('Invalid webhookId');
        return makeRequest(apiToken, 'GET', `webhook/${webhookId}`);
    },

    async getAllWebhooks() {
        return makeRequest(apiToken, 'GET', 'webhook/all');
    },

    async removeWebhook(webhookId) {
        if (typeof webhookId !== 'number') throw new Error('Invalid webhookId');
        return makeRequest(apiToken, 'DELETE', `webhook/${webhookId}`);
    }
})

module.exports = WebhooksAPI;
