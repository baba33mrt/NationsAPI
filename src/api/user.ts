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

interface User {
    error?: any;
    username: string;
    created_at: string;
    last_connection: string;
    description: string;
    is_prime: boolean;
    signature: string;
    skin: Skin;
    servers: Record<string, ServerData>;
}

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

const UserAPI = (apiToken: string) => ({
    async get(username: string): Promise<User | { error: any }> {
        const validUsername = validateString(username, 'username');
        return makeRequest(apiToken, 'GET', `user/${validUsername}`);
    },

    async onLine(username: string, server: string | null = null): Promise<OnlineStatus | { error: any }> {
        const validUsername = validateString(username, 'username');
        if (server !== null) validateString(server, 'server');

        const user = await this.get(validUsername);
        if (user.error) return { error: user.error };
        if (!user.servers) throw new Error('Servers data is missing');

        if (server && user.servers?.[server]) {
            return {
                [server]: {
                    online: user.servers[server].online,
                    last_connection: user.servers[server].last_connection,
                    last_connectionTimestamp: user.servers[server].last_connection ? new Date(user.servers[server].last_connection!).getTime() : undefined
                }
            };
        }

        const serversOnline: OnlineStatus = {};
        for (const [srv, data] of Object.entries(user.servers)) {
            if (data.last_connection === null) {
                serversOnline[srv] = { online: false, last_connection: null };
            } else {
                serversOnline[srv] = {
                    online: data.online,
                    last_connection: data.last_connection,
                    last_connectionTimestamp: new Date(data.last_connection).getTime(),
                };
            }
        }
        return serversOnline;
    },

    async getHead(username: string, relief: boolean = false, size: number = 16): Promise<string | { error: any }> {
        const validUsername = validateString(username, 'username');
        const validSize = validateSize(size);

        const user = await this.get(validUsername);
        if (user.error) return { error: user.error };

        return `https://skins.nationsglory.fr/face/${relief ? '3d/' : ''}${user.username}/${validSize}`;
    },

    async getBody(username: string, relief: boolean = false, size: number = 16): Promise<string | { error: any }> {
        const validUsername = validateString(username, 'username');
        const validSize = validateSize(size);

        const user = await this.get(validUsername);
        if (user.error) return { error: user.error };

        return `https://skins.nationsglory.fr/body/${relief ? '3d/' : ''}${user.username}/${validSize}`;
    },

    async getSkin(username: string): Promise<string | { error: any }> {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return { error: user.error };

        return user.skin.source;
    },

    async getDescription(username: string): Promise<string | { error: any }> {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return { error: user.error };

        return user.description;
    },

    async getPrime(username: string): Promise<boolean | { error: any }> {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return { error: user.error };

        return user.is_prime;
    },
    async getSignature(username: string): Promise<string | { error: any }> {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return { error: user.error };

        return user.signature;
    },
    async signatureToMD(username: string): Promise<string | { error: any }> {
        const validUsername = validateString(username, 'username');

        const description = await this.getSignature(validUsername);
        if (typeof description !== 'string') return description;

        return NodeHtmlMarkdown.translate(description);
    },
    async getCreationDate(username: string): Promise<string | { error: any }> {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return { error: user.error };

        return user.created_at;
    },
    async getLastConnection(username: string): Promise<string | { error: any }> {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return { error: user.error };

        return user.last_connection;
    },
    async getSkills(username: string, server: string | null = null): Promise<any | { error: any }> {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return { error: user.error };
        if (!user.servers) throw new Error('Servers data is missing');


        if (server && user.servers?.[server]) {
            return user.servers[server].skills;
        }

        const serversSkills: Record<string, any> = {};
        for (const [srv, data] of Object.entries(user.servers)) {
            serversSkills[srv] = data.skills;
        }
        return serversSkills;
    },
});

export default UserAPI;
