module.exports = {
  admin: {
    username: 'admin',                                //Username to log in with
    password: 'password'                              //Password to log in with
  },
  token: {
    secret: 'miart-app',                              //The secret for generating the token
    expiresInMinutes: 10,                             //Time after which the token expires - refresh token before it expires
    maxExpiresInMinutes: 180                          //Time after which the token can no longer be refreshed
  }
};