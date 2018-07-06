const
    router = require('express').Router(),
    notFound = require("./404"),
    tokens = require("./tokens"),
    tokensInfo = require("./tokensInfo"),
    user = require("./user");

router.use('/user',user);
router.use('/user/tokens',tokens);
router.use('/tokens-info',tokensInfo);
router.use('/',notFound);
module.exports = router;