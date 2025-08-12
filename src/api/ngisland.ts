import { makeRequest, getQueryString } from '../utils/request';

interface NGIsland {
    id: number;
    serverNumber: number;
    name: string;
    description: string;
    creator: string;
    isPrivate: number; // 0 for public, 1 for private
    playersOnline: number;
    membersOnline: number;
    size: number;
    creationTime: number; // Unix timestamp
    regenTime: number; // Unix timestamp
    creationDate: string; // "DD/MM/YYYY"
    password: number; // 0 for no password, 1 for password
    voteDown: number;
    voteUp: number;
    voteDiff: number;
    lastActivity: number; // Unix timestamp
    visit: number;
    members: string; // "#member1##member2#"
    image: string; // Base64 encoded image
}

interface AllIslandsResponse {
    current_page: number;
    total_pages: number;
    total_records: number;
    data: NGIsland[];
}

const NgIslandAPI = (apiToken: string) => ({
    async getAllIslands(page: number = 1): Promise<AllIslandsResponse | { error: any }> {
        if (typeof page !== 'number') throw new Error('Invalid page');
        const params = { page };
        const queryString = await getQueryString(params);

        return makeRequest(apiToken, 'GET', `ngisland/list${queryString}`);
    },
});

export default NgIslandAPI;
