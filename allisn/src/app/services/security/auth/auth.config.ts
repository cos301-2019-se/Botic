import { environment } from './../../../../environments/environment';

interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: environment.auth.clientId,
    CLIENT_DOMAIN: environment.auth.domain,
    AUDIENCE: environment.auth.audience,
    REDIRECT: environment.auth.redirect,
    SCOPE: 'openid profile read:profile send:messages read:messages',
};
