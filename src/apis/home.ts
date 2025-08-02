import { instance } from './instance';

export const getHome = () => instance.get('/');
