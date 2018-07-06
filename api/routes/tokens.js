const
    asyncify = require('../system/asyncify'),
    router = require('express').Router(),
    tokenController = require("../controller/tokens");

router.get('/', asyncify(tokenController.getUserTokens));
router.post('/', asyncify(tokenController.setUserTokens));
module.exports = router;