const {makeRequest} = require('../utils/request');
const {NodeHtmlMarkdown} = require('node-html-markdown');
const validateString = (value, fieldName) => {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`Invalid ${fieldName}`);
    }
    return value.trim();
};

const validateSize = (size) => {
    if (typeof size !== 'number' || size < 1 || size > 256) {
        throw new Error('Invalid size (1-256)');
    }
    return size;
};

const UserAPI = (apiToken) => ({
    async get(username) {
        const validUsername = validateString(username, 'username');
        return makeRequest(apiToken, 'GET', `user/${validUsername}`);
    },

    async onLine(username, server = null) {
        const validUsername = validateString(username, 'username');
        if (server !== null) validateString(server, 'server');

        const user = await this.get(validUsername);
        if (user.error) return user;
        if (!user.servers) throw new Error('Servers data is missing');

        if (server && user.servers?.[server]) {
            return {
                online: user.servers[server].online,
                last_connection: user.servers[server].last_connection,
                last_connectionTimestamp: new Date(user.servers[server].last_connection).getTime()
            };
        }

        const serversOnline = {};
        for (const [srv, data] of Object.entries(user.servers)) {
            if (data.last_connection === null) {
                serversOnline[srv] = {online: false, last_connection: null};
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

    async getHead(username, relief = false, size = 16) {
        const validUsername = validateString(username, 'username');
        const validSize = validateSize(size);

        const user = await this.get(validUsername);
        if (user.error) return user;

        return `https://skins.nationsglory.fr/face/${relief ? '3d/' : ''}${user.username}/${validSize}`;
    },

    async getBody(username, relief = false, size = 16) {
        const validUsername = validateString(username, 'username');
        const validSize = validateSize(size);

        const user = await this.get(validUsername);
        if (user.error) return user;

        return `https://skins.nationsglory.fr/body/${relief ? '3d/' : ''}${user.username}/${validSize}`;
    },

    async getSkin(username) {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return user;

        return `https://skins.nationsglory.fr/${user.username}`;
    },

    async getDescription(username) {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return user;

        return user.description;
    },

    async getPrime(username) {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return user;

        return user.is_prime;
    },
    async getSignature(username) {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return user;

        return user.signature;
    },
    async signatureToMD(username) {
        const validUsername = validateString(username, 'username');

        const description = await this.getSignature(validUsername);
        if (description.error) return description;

        return NodeHtmlMarkdown.translate(description);
    },
    async getCreationDate(username) {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return user;

        return user.created_at;
    },
    async getLastConnection(username) {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return user;

        return user.last_connection;
    },
    async getSkills(username, server = null) {
        const validUsername = validateString(username, 'username');

        const user = await this.get(validUsername);
        if (user.error) return user;

        if (server && user.servers?.[server]) {
            return user.servers[server].skills;
        }

        const serversSkills = {};
        for (const [srv, data] of Object.entries(user.servers)) {
            serversSkills[srv] = data.skills

        }
        return serversSkills;
    },
});

module.exports = UserAPI;
