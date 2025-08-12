import { makeRequest } from '../utils/request';

class NabotAPI {
    private apiToken: string;
    private sessionUid: number | null;

    constructor(apiToken: string) {
        this.apiToken = apiToken;
        this.sessionUid = null;
    }

    async initialize(): Promise<void> {
        if (!this.sessionUid) {
            this.sessionUid = await this.createSession();
        }
    }

    async sendMessage(data: string): Promise<any> { // Assuming any for now as I cannot test it
        if (typeof data !== "string") throw new Error("Message must be a string");
        await this.initialize();
        return makeRequest(this.apiToken, 'POST', 'nabot/CreateMessage', { message: data, session_uid: this.sessionUid });
    }

    async getSessionUid(): Promise<number | null> {
        await this.initialize();
        return this.sessionUid;
    }

    async setSessionUid(sessionUid: number): Promise<void> {
        if (typeof sessionUid !== "number") throw new Error("Session UID must be a number");
        this.sessionUid = sessionUid;
    }

    async createSession(): Promise<number> {
        const data = await makeRequest(this.apiToken, 'GET', 'nabot/createSession');
        return data; // The API returns the session_uid directly, not an object with session_uid
    }
}

export default NabotAPI;
