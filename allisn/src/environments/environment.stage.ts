// environment.stage.ts
export const environment = {
    production: false,
    envName: 'stage',
    auth: {
        clientId: 'nXfkTQe04GVTy7qgAFbjh3ebI2faaYPc',
        domain: 'dev-3b2f4l27.auth0.com',
        redirect: 'http://localhost:8080/chat',
        logoutUrl: 'http://localhost:8080',
        audience: 'http://localhost:8080/chat',
        roles_namespace: 'openid profile read:profile send:messages read:messages'
      },
    databaseManager: {
        baseUrl: 'http://localhost:5000/'
    },
    customerChat: {
        baseUrl: 'http://127.0.0.1:5001/prattle'
    },
    scrapper: {
        baseUrl: 'http://127.0.0.1:5002/scrub'
    },
    sendTicket: {
        baseUrl: 'http://localhost:5000/'
    },
};
