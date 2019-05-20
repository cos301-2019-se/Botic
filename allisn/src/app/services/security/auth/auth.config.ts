interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'gMNTaDHZ4Kat3JO8zMlpMwhqt1vvbk5V',
    CLIENT_DOMAIN: 'learning-lsg.auth0.com',
    AUDIENCE: 'botic-frontend.herokuapp.com/chat',
    REDIRECT: 'https://botic-frontend.herokuapp.com/chat'/*'http://localhost:4200/chat'*/,
    SCOPE: 'openid profile read:profile send:messages read:messages',
};