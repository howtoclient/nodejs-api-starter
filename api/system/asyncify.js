const APIResponse = require('./APIResponse');
module.exports = (handler) =>
    async (req, res, next) => {
        try {
            new APIResponse(res).success(
                await handler(req, next)
            )
        } catch (error) {
            next(error);
        }
    };
