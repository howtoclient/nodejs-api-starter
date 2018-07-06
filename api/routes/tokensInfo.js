const
    asyncify = require('../system/asyncify'),
    router = require('express').Router(),
    tokensInfoController = require("../controller/tokensInfo");

router.get('/', asyncify(tokensInfoController.getAllTokens));
router.post('/', asyncify(tokensInfoController.getSpecificTokens));
module.exports = router;