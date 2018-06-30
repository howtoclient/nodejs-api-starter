const
    asyncify = require('../system/asyncify'),
    router = require('express').Router();

router.get('/test', asyncify(
    async () => {
        return {ok:true}
    }
));

module.exports = router;