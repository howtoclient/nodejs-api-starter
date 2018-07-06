const
    asyncify = require('./asyncify'),
    router = require('express').Router(),
    AuthenticationError = require('./APIResponse/errors/AuthenticationError'),
    uuid4 = require('uuid/v4'),
    jsondb=require('../../jsondb');

router.post('/login', asyncify(
    async (req) => {
        const {
            username,
            password
        } = req.body,
            user =  jsondb.get('users').find({username, _password: password});
        if (!user.value()){
            throw new AuthenticationError("Invalid username or password");
        }
        user.assign({token:uuid4()}).write();
        return user.value();
    }
));

module.exports = router;