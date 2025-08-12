import { makeRequest, getQueryString } from '../utils/request';

interface OAuthError {
    error: string;
}

const OAuthAPI = (apiToken: string) => ({
    async createService(name: string, redirectUri: string): Promise<any> { // Assuming any for now
        if (name && typeof name !== 'string') throw new Error('Invalid name');
        if (redirectUri && typeof redirectUri !== 'string') throw new Error('Invalid redirect Uri');
        const data = { name: name, redirect_uri: redirectUri };
        return makeRequest(apiToken, 'PUT', 'oauth/create', data);
    },

    async deleteService(): Promise<any> { // Assuming any for now
        return makeRequest(apiToken, 'DELETE', `oauth/delete`);
    },

    async checkAccessToken(access_token: string, client_secret: string): Promise<{ error: OAuthError } | any> {
        if (access_token && typeof access_token !== 'string') throw new Error('Invalid access token');
        if (client_secret && typeof client_secret !== 'string') throw new Error('Invalid client secret');
        const params = { access_token, client_secret };
        const queryString = await getQueryString(params);
        return makeRequest(null, 'GET', `oauth/checkToken${queryString}`);
    },

    async patchService(redirectUri: string, contact: string, name: string): Promise<any> { // Assuming any for now
        if (redirectUri && typeof redirectUri !== 'string') throw new Error('Invalid redirect Uri');
        if (contact && typeof contact !== 'string') throw new Error('Invalid contact');
        if (name && typeof name !== 'string') throw new Error('Invalid name');
        const data = { redirect_uri: redirectUri, contact: contact, name: name };
        return makeRequest(apiToken, 'PATCH', 'oauth/patch', data);
    }
});

export default OAuthAPI;
