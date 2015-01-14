var jwt = require('jsonwebtoken');

var config = require(__base + 'config');

exports.createToken = function(loginName, loginPassword, callback) {
    if (loginName === config.admin.username && loginPassword === config.admin.password) {
        var user = {
            user: loginName,
            creation: Math.round(new Date().getTime()/1000) //In seconds since epoch
        };

        callback(null, {
            token: generateToken(user)
        });
    } else {
        callback({
            name: 'LoginError',
            description: 'Login failed. The login name or password are wrong.'
        });
    }
};

exports.updateToken = function(user, callback) {
    var oldestAllowedDate = Math.round(new Date().getTime()/1000); //In seconds since epoch
    oldestAllowedDate = oldestAllowedDate - 60*config.token.maxExpiresInMinutes;

    //If oldest allowed date is later than the creation time: send error to client
    if (oldestAllowedDate < user.creation) {
        callback(null, {
            token: generateToken(user)
        });
    } else {
        callback({
            name: 'RefreshTokenError',
            description: 'Logged in for too long. Please log in again'
        });
    }
};

function generateToken(user) {
    return jwt.sign(user, config.token.secret, {
        expiresInMinutes: config.token.expiresInMinutes
    });
}
