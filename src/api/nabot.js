const {makeRequest} = require('../utils/request');

class NabotAPI {
    constructor(apiToken,) {
        this.apiToken = apiToken;
        this.sessionUid = null;
    }

    async initialize() {
        if (!this.sessionUid) {
            this.sessionUid = await this.createSession();
        }
    }

    async sendMessage(data) {
        if (typeof data !== "string") throw new Error("Message must be a string");
        await this.initialize();
        return makeRequest(this.apiToken, 'POST', 'nabot/CreateMessage', { message: data, session_uid: this.sessionUid });
    }

    async getSessionUid() {
        await this.initialize();
        return this.sessionUid;
    }

    async setSessionUid(sessionUid) {
        if (typeof sessionUid !== "number") throw new Error("Session UID must be a number");
        this.sessionUid = sessionUid;
    }



    async createSession() {
        const data = await makeRequest(this.apiToken, 'GET', 'nabot/createSession');
        return data.session_uid;
    }
}

module.exports = NabotAPI;
