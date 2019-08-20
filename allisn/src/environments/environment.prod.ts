export const environment = {
  production: true,
  auth: {
    clientId: 'gMNTaDHZ4Kat3JO8zMlpMwhqt1vvbk5V',
    domain: 'learning-lsg.auth0.com',
    redirect: 'http://botic-frontend.herokuapp.com/chat', /*'http://localhost:4200/chat'*/
    logoutUrl: 'http://botic-frontend.herokuapp.com/chat',
    roles_namespace: 'openid profile read:profile send:messages read:messages'
  },
  databaseManager: {
    baseUrl: 'http://localhost:5000/'
  }
};
