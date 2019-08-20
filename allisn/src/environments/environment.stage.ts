// environment.stage.ts
export const environment = {
    production: false,
    envName: 'stage',
    auth: {
        clientId: 'gMNTaDHZ4Kat3JO8zMlpMwhqt1vvbk5V',
        domain: 'learning-lsg.auth0.com',
        redirect: 'http://localhost:8080/chat',
        logoutUrl: 'http://localhost:8080/chat',
        roles_namespace: 'openid profile read:profile send:messages read:messages'
      },
    databaseManager: {
        baseUrl: 'http://localhost:5000/'
    }
};
