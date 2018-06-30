const
    config = require('./config'),
    api = require('./api');

(async () => {
    api.listen(config.port, () => {
        //databases should be required here
        console.log("working!");
    })
})();