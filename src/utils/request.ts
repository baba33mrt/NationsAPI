import axios, { Method } from 'axios';
import { baseURL, getHeaders } from '../config';

const makeRequest = async (apiToken: string | null, method: Method, endpoint: string, data: any = null): Promise<any> => {
    try {
        const response = await axios({
            method: method,
            url: `${baseURL}${endpoint}`,
            headers: getHeaders(apiToken),
            data: data
        });
        return response.data;
    } catch (error: any) {
        console.error(`Error making request to ${endpoint}:`, error.response.data);
        return { error: error.response.data };
    }
};

const getQueryString = async (params: Record<string, any>): Promise<string> => {
    const queryParams = new URLSearchParams(params);
    return '?' + queryParams.toString();
};

export { makeRequest, getQueryString };