import { makeRequest, getQueryString } from '../utils/request';

interface PlanningEntry {
    // Assuming a planning entry has a date and description
    date: string;
    description: string;
    // Add other properties if known
}

interface PlayerCount {
    // Assuming it returns a number or an object with a count
    count: number;
    // Add other properties if known
}

interface HDVItem {
    // Assuming HDV items have an id, name, price, etc.
    id: string;
    name: string;
    price: number;
    // Add other properties if known
}

const ServerAPI = (apiToken: string) => ({
    async getPlanning(server: string, month: number, year: number): Promise<PlanningEntry[] | { error: any }> {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        if (month && typeof month !== 'number') throw new Error('Invalid month');
        if (year && typeof year !== 'number') throw new Error('Invalid year');
        const params = { server, month, year };
        const queryString = await getQueryString(params);
        return makeRequest(apiToken, 'GET', `planning${queryString}`);
    },

    async getPlayersCount(server: string | null = null): Promise<PlayerCount | { error: any }> {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        if (server) return makeRequest(apiToken, 'GET', `playercount/${server}`);
        return makeRequest(apiToken, 'GET', 'playercount');
    },

    async getHDV(server: string): Promise<HDVItem[] | { error: any }> {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        return makeRequest(apiToken, 'GET', `hdv/${server}/list`);
    }
});

export default ServerAPI;
