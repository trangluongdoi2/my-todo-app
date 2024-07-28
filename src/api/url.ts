export const LOCAL_SERVER_URL = 'http://localhost:9998';

export const API_URL = process.env.NODE_ENV === 'production' ? 'https://my-todo-backend-fpuu.onrender.com' : LOCAL_SERVER_URL;
