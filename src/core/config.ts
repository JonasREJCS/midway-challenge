require('dotenv').config()
const { env } = process;


export const dbURI = env.DB_URI;
