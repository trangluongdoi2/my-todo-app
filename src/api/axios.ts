import { API_URL } from '@/api/url';
import axios from 'axios';

export const originAxios = axios.create({
  baseURL: API_URL
});

const customAxios = axios.create({
  baseURL: API_URL,
  // headers: { 'Content-Type': 'application/json' },
  // withCredentials: true
});

export default customAxios;
