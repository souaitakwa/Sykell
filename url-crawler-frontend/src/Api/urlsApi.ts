import axios from 'axios';
import type { UrlData } from '../types/UrlData';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { Authorization: 'Bearer mySuperSecretToken' },
});

export const getUrls = async (): Promise<UrlData[]> => {
    const response = await api.get('/urls');
    return response.data;
};

export const getUrlDetail = async (id: string): Promise<UrlData> => {
    const response = await api.get(`/urls/${id}`);
    return response.data;
};

interface CreateUrlPayload {
    url: string;
}

export const createUrl = async (urlData: CreateUrlPayload) => {
    await api.post('/urls', urlData);
};

export const rerunUrls = async (ids: number[]) => {
    await api.post('/urls/rerun', ids);
};

export const deleteUrl = async (id: number) => {
    await api.delete(`/urls/${id}`);
};

