import { makeRequest, getQueryString } from '../utils/request';
import { base64ToBuffer } from '../utils/converters';

interface Country {
    name: string;
    base_name: string;
    empire_name: string;
    server: string;
    server_type: string;
    creation_date: string;
    description: string;
    bank: number;
    flag: string;
    coords: string[];
    leader: string;
    count_members: number;
    members: string[];
    power: number;
    maxpower: number;
    count_claims: number;
    mmr: number;
    level: number;
    allies: string[];
    enemies: string[];
    colonies: string[];
}

interface ClaimedCountry {
    name: string;
}

interface AvailableCountry {
    name: string;
    x: string;
    z: string;
}

interface Countries {
    claimed: ClaimedCountry[];
    availables: AvailableCountry[];
}

interface NotationsParams {
    server?: string;
    week?: number;
    country?: string;
}

const CountryAPI = (apiToken: string) => ({
    async getNotations({ server, week = Math.floor((Date.now() / 1000 - 342100) / 604800) - 1, country = undefined }: NotationsParams): Promise<any> {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        if (week && typeof week !== 'number') throw new Error('Invalid week');
        if (country && typeof country !== 'string') throw new Error('Invalid country');

        const params = { week, country, server };
        const queryString = await getQueryString(params);
        return makeRequest(apiToken, 'GET', `notations${queryString}`);
    },

    async get(server: string, country: string): Promise<Country | { error: any }> {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        if (country && typeof country !== 'string') throw new Error('Invalid country');
        return makeRequest(apiToken, 'GET', `country/${server}/${country}`);
    },

    async getCountries(server: string): Promise<Countries | { error: any }> {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        return makeRequest(apiToken, 'GET', `country/list/${server}`);
    },

    async getCreatedCountries(server: string): Promise<ClaimedCountry[] | { error: any }> {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        const countries = await this.getCountries(server);
        if ('error' in countries) return countries;
        return countries.claimed;
    },

    async getAvailablesCountries(server: string): Promise<AvailableCountry[] | { error: any }> {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        const countries = await this.getCountries(server);
        if ('error' in countries) return countries;
        return countries.availables;
    },

    async convertFlagToBuffer(flag: string): Promise<Buffer> {
        return base64ToBuffer(flag);
    }
});

export default CountryAPI;