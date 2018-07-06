const
    asyncify = require('../system/asyncify'),
    router = require('express').Router(),
    userController = require("../controller/user");

router.get('/', asyncify(userController.getUser));
module.exports = router;