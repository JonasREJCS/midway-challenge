require('dotenv').config()
const { env } = process;

const REQUIRED_ENV_VARS = [
    'DB_URI'
]

export function validateEnvVars(): void {
    REQUIRED_ENV_VARS.forEach((envVar) => {
        const val = process.env[envVar];
        if (val === '' || val === null || val === undefined) {
            throw new Error(`Required ENV VAR not set: ${envVar}`);
        }
    });
}

export const dbURI = env.DB_URI;
