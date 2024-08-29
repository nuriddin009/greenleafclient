const env = {
    development: 'http://localhost:8080/api',
    production: 'http://localhost:8080/api',
    test: 'http://localhost:8080/api',
}

const getEnv = () => env[import.meta.env.MODE];

console.log(getEnv())
export const API_BASE_URL = getEnv()
export const AUTH_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'
