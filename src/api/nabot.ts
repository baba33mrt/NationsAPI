import { makeRequest, ApiError } from '../utils/request';

const isApiError = (x: unknown): x is ApiError =>
    typeof x === 'object' && x !== null && 'error' in x;

class NabotAPI {
    private apiToken: string;
    private sessionUid: number | null;

    constructor(apiToken: string) {
        this.apiToken = apiToken;
        this.sessionUid = null;
    }

    async initialize(): Promise<void> {
        if (this.sessionUid == null) {
            this.sessionUid = await this.createSession();
        }
    }

    async sendMessage(data: string): Promise<unknown | ApiError> {
        if (typeof data !== 'string') throw new Error('Message must be a string');
        await this.initialize();
        // L’API renvoie un objet (inconnu ici) → on laisse unknown | ApiError
        return makeRequest<unknown>(
            this.apiToken,
            'POST',
            'nabot/CreateMessage',
            { message: data, session_uid: this.sessionUid }
        );
    }

    async getSessionUid(): Promise<number | null> {
        await this.initialize();
        return this.sessionUid;
    }

    async setSessionUid(sessionUid: number): Promise<void> {
        if (typeof sessionUid !== 'number') throw new Error('Session UID must be a number');
        this.sessionUid = sessionUid;
    }

    async createSession(): Promise<number> {
        const res = await makeRequest<number>(this.apiToken, 'GET', 'nabot/createSession');
        if (isApiError(res)) {
            throw new Error(`Failed to create session: ${JSON.stringify(res.error)}`);
        }
        if (typeof res !== 'number') {
            throw new Error('Invalid session UID returned by API');
        }
        return res; // ✅ bien un number
    }
}

export default NabotAPI;
