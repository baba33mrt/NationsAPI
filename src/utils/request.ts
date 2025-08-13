// utils/request.ts
import axios, { AxiosError, Method } from 'axios';
import { baseURL, getHeaders } from '../config';

export interface ApiError {
    error: unknown;
}

/**
 * Appelle l'API et retourne soit T, soit { error } en cas d'échec contrôlé.
 * Utilisation : const res = await makeRequest<User>(token, 'GET', 'user/foo');
 */
export async function makeRequest<T = unknown>(
    apiToken: string | null,
    method: Method,
    endpoint: string,
    data?: unknown
): Promise<T | ApiError> {
    try {
        const response = await axios.request<T>({
            method,
            url: `${baseURL}${endpoint}`,
            headers: getHeaders(apiToken),
            data,
        });
        return response.data;
    } catch (err) {
        const e = err as AxiosError;
        // Log léger côté CI sans crasher le process
        console.error(`Error making request to ${endpoint}:`, e.response?.data ?? e.message);
        return { error: e.response?.data ?? e.message };
    }
}

/**
 * Construit une query string en ignorant les valeurs null/undefined
 * et en gérant correctement les tableaux (clé répétée).
 * Renvoie '' s'il n'y a aucun paramètre valable.
 */
export function getQueryString(params: Record<string, unknown>): string {
    const search = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;

        if (Array.isArray(value)) {
            for (const v of value) {
                if (v === undefined || v === null) continue;
                search.append(key, String(v));
            }
        } else {
            search.append(key, String(value));
        }
    }

    const qs = search.toString();
    return qs ? `?${qs}` : '';
}
