export const LOCAL_SERVER_URL = 'http://localhost:1000';
export const PROD_SERVER_URL = 'https://www.server.trangluongdoi2.com';

// export const API_URL = process.env.NODE_ENV === 'production' ? PROD_SERVER_URL : LOCAL_SERVER_URL;
// export const API_URL = process.env.NODE_ENV === 'production' ? PROD_SERVER_URL : PROD_SERVER_URL;
export const API_URL = process.env.NODE_ENV === 'production' ? PROD_SERVER_URL : LOCAL_SERVER_URL;
