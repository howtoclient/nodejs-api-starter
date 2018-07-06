const
    AuthenticationError = require('./APIResponse/errors/AuthenticationError'),
    jsondb = require('../../jsondb');

module.exports = (req, res, next) => {
    const
        {authorization} = req.headers || {},
        user = jsondb.get('users').find(
            {
                token: req.headers.authorization
            }
        );
    if (user.value()) {
        req.user = user.value();
        next();
    } else {
        throw new AuthenticationError(
            authorization ? "Ivalid Token" : "No Token found"
        );
    }
};