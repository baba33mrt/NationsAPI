import { makeRequest } from '../utils/request';

type WebhookEvent = 'country.created' | 'country.disbanded' | 'country.changeleader';

interface Webhook {
    id: number;
    url: string;
    eventType: WebhookEvent;
    // Add other properties if known
}

const WebhooksAPI = (apiToken: string) => ({
    async _registerWebhook(url: string, eventType: WebhookEvent): Promise<any> {
        if (typeof url !== 'string' || url === '') throw new Error('Invalid URL');
        if (typeof eventType !== 'string') throw new Error('Invalid eventType');
        const data = { url: url, eventType: eventType };
        return makeRequest(apiToken, 'POST', 'webhook/register', data);
    },

    async createCountry(url: string): Promise<any> {
        if (typeof url !== 'string' || url === '') throw new Error('Invalid URL');
        return this._registerWebhook(url, 'country.created');
    },

    async disbandCountry(url: string): Promise<any> {
        if (typeof url !== 'string' || url === '') throw new Error('Invalid URL');
        return this._registerWebhook(url, 'country.disbanded');
    },

    async changeLeader(url: string): Promise<any> {
        if (typeof url !== 'string' || url === '') throw new Error('Invalid URL');
        return this._registerWebhook(url, 'country.changeleader');
    },

    async getWebhook(webhookId: number): Promise<Webhook | { error: any }> {
        if (typeof webhookId !== 'number') throw new Error('Invalid webhookId');
        return makeRequest(apiToken, 'GET', `webhook/${webhookId}`);
    },

    async getAllWebhooks(): Promise<Webhook[] | { error: any }> {
        return makeRequest(apiToken, 'GET', 'webhook/all');
    },

    async removeWebhook(webhookId: number): Promise<any> {
        if (typeof webhookId !== 'number') throw new Error('Invalid webhookId');
        return makeRequest(apiToken, 'DELETE', `webhook/${webhookId}`);
    }
});

export default WebhooksAPI;