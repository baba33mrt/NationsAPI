import { makeRequest } from '../utils/request';
import { NodeHtmlMarkdown } from 'node-html-markdown';

interface Skills {
    miner: number;
    lumberjack: number;
    farmer: number;
    builder: number;
    hunter: number;
    engineer: number;
}

interface ServerData {
    country: string | null;
    country_rank: string | null;
    power: number | null;
    max_power: number | null;
    groups: string[] | null;
    last_connection: string | null;
    playtime: number | null;
    online: boolean;
    skills: Skills | false | [];
}

interface Skin {
    source: string;
    head: string;
    body: string;
}

export interface User {
    username: string;
    created_at: string;
    last_connection: string;
    description: string;
    is_prime: boolean;
    signature: string;
    skin: Skin;
    servers: Record<string, ServerData>;
}

export interface ApiError {
    error: any;
}

export type UserResult = User | ApiError;

interface OnlineStatus {
    [server: string]: {
        online: boolean;
        last_connection: string | null;
        last_connectionTimestamp?: number;
    };
}

const validateString = (value: any, fieldName: string): string => {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`Invalid ${fieldName}`);
    }
    return value.trim();
};

const validateSize = (size: any): number => {
    if (typeof size !== 'number' || size < 1 || size > 256) {
        throw new Error('Invalid size (1-256)');
    }
    return size;
};

// Type guards
const isApiError = (x: unknown): x is ApiError =>
    typeof x === 'object' && x !== null && 'error' in x;

const isUser = (x: unknown): x is User =>
    typeof x === 'object' && x !== null && 'username' in x && 'servers' in x;

const UserAPI = (apiToken: string) => ({
    async get(username: string): Promise<UserResult> {
        const validUsername = validateString(username, 'username');
        return makeRequest<UserResult>(apiToken, 'GET', `user/${validUsername}`);
    },

    async onLine(username: string, server: string | null = null): Promise<OnlineStatus | ApiError> {
        const validUsername = validateString(username, 'username');
        if (server !== null) validateString(server, 'server');

        const res = await this.get(validUsername);
        if (isApiError(res)) return res;

        if (!res.servers) throw new Error('Servers data is missing');

        if (server && res.servers[server]) {
            return {
                [server]: {
                    online: res.servers[server].online,
                    last_connection: res.servers[server].last_connection,
                    last_connectionTimestamp: res.servers[server].last_connection
                        ? new Date(res.servers[server].last_connection).getTime()
                        : undefined,
                },
            };
        }

        const serversOnline: OnlineStatus = {};
        for (const [srv, data] of Object.entries(res.servers)) {
            serversOnline[srv] = data.last_connection === null
                ? { online: false, last_connection: null }
                : {
                    online: data.online,
                    last_connection: data.last_connection,
                    last_connectionTimestamp: new Date(data.last_connection).getTime(),
                };
        }
        return serversOnline;
    },

    async getHead(username: string, relief = false, size = 16): Promise<string | ApiError> {
        const validUsername = validateString(username, 'username');
        const validSize = validateSize(size);
        const res = await this.get(validUsername);
        if (isApiError(res)) return res;
        return `https://skins.nationsglory.fr/face/${relief ? '3d/' : ''}${res.username}/${validSize}`;
    },

    async getBody(username: string, relief = false, size = 16): Promise<string | ApiError> {
        const validUsername = validateString(username, 'username');
        const validSize = validateSize(size);
        const res = await this.get(validUsername);
        if (isApiError(res)) return res;
        return `https://skins.nationsglory.fr/body/${relief ? '3d/' : ''}${res.username}/${validSize}`;
    },

    async getSkin(username: string): Promise<string | ApiError> {
        const validUsername = validateString(username, 'username');
        const res = await this.get(validUsername);
        if (isApiError(res)) return res;
        return res.skin.source;
    },

    async getDescription(username: string): Promise<string | ApiError> {
        const validUsername = validateString(username, 'username');
        const res = await this.get(validUsername);
        if (isApiError(res)) return res;
        return res.description;
    },

    async getPrime(username: string): Promise<boolean | ApiError> {
        const validUsername = validateString(username, 'username');
        const res = await this.get(validUsername);
        if (isApiError(res)) return res;
        return res.is_prime;
    },

    async getSignature(username: string): Promise<string | ApiError> {
        const validUsername = validateString(username, 'username');
        const res = await this.get(validUsername);
        if (isApiError(res)) return res;
        return res.signature;
    },

    async signatureToMD(username: string): Promise<string | ApiError> {
        const sig = await this.getSignature(username);
        if (typeof sig !== 'string') return sig;
        return NodeHtmlMarkdown.translate(sig);
    },

    async getCreationDate(username: string): Promise<string | ApiError> {
        const validUsername = validateString(username, 'username');
        const res = await this.get(validUsername);
        if (isApiError(res)) return res;
        return res.created_at;
    },

    async getLastConnection(username: string): Promise<string | ApiError> {
        const validUsername = validateString(username, 'username');
        const res = await this.get(validUsername);
        if (isApiError(res)) return res;
        return res.last_connection;
    },

    async getSkills(username: string, server: string | null = null): Promise<any | ApiError> {
        const validUsername = validateString(username, 'username');
        const res = await this.get(validUsername);
        if (isApiError(res)) return res;

        if (!res.servers) throw new Error('Servers data is missing');

        if (server && res.servers[server]) {
            return res.servers[server].skills;
        }

        const serversSkills: Record<string, any> = {};
        for (const [srv, data] of Object.entries(res.servers)) {
            serversSkills[srv] = data.skills;
        }
        return serversSkills;
    },
});

export default UserAPI;
