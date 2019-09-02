export const environment = {
  production: true,
  auth: {
    clientId: 'nXfkTQe04GVTy7qgAFbjh3ebI2faaYPc',
    domain: 'dev-3b2f4l27.auth0.com',
    redirect: 'http://botic-frontend.herokuapp.com/chat',
    audience: 'http://localhost:8080/chat',
    logoutUrl: 'http://botic-frontend.herokuapp.com/chat',
    roles_namespace: 'openid profile read:profile send:messages read:messages'
  },
  databaseManager: {
    baseUrl: 'http://localhost:5000/'
  },
  customerChat: {
    baseUrl: 'http://botic-ai-cs.herokuapp.com/prattle'
  }
};
