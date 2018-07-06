const
    asyncify = require('../system/asyncify'),
    router = require('express').Router();

router.use('/error', asyncify(()=> {
    throw new Error("This is an error api. Always throws stuff at you...");
}));
module.exports = router;