export const env = {
  baseServerUrl: import.meta.env.VITE_BASE_SERVER_URL || 'http://localhost:5000',
  baseApiUrl: import.meta.env.VITE_BASE_SERVER_URL + '/api' || 'http://localhost:5000/api',
};
