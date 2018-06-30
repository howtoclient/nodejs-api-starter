const
    asyncify = require('../system/asyncify'),
    router = require('express').Router(),
    NotFoundError = require('../system/APIResponse/errors/NotFoundError');

router.use('/', asyncify(
    async (req) => {
        throw new NotFoundError("[" + req.method + "] - " + req.path);
    }
));

module.exports = router;