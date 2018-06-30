const
    router = require('express').Router(),
    notFound = require("./404"),
    testRoutes = require('test-routes');

router.use('/',testRoutes);
router.use('/',notFound);
module.exports = router;