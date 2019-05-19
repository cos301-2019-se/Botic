//import { ENV } from './../core/env.config';

interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: '',
    CLIENT_DOMAIN: '',
    AUDIENCE: '',
    REDIRECT: `${ENV.BASE_URI}/callback`,
    SCOPE: '',
};