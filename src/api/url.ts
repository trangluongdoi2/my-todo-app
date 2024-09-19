export const LOCAL_SERVER_URL = 'http://localhost:9998';
export const PROD_SERVER_URL = 'http://18.138.35.101';

export const API_URL = process.env.NODE_ENV === 'production' ? PROD_SERVER_URL : LOCAL_SERVER_URL;
